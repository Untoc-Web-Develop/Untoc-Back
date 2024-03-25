import { randomBytes } from 'crypto';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import ERROR from 'src/common/error';
import { Email } from 'src/entities/email.entity';
import { User } from 'src/entities/user.entity';
import { Whitelist } from 'src/entities/whitelist.entity';
import { RegisterRequestDto } from 'src/services/auth/dto/register.dto';
import { AccessPayload } from 'src/services/auth/payload/access.payload';
import { RefreshPayload } from 'src/services/auth/payload/refresh.payload';
import { Repository } from 'typeorm';

import { GetUsersResponseDto } from './dto/get-users.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Whitelist)
    private readonly whitelistRepository: Repository<Whitelist>,

    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,

    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['badges'],
    });
    if (!user) {
      throw ERROR.INVALID_CREDENTIALS;
    }
    const encryptedPassword = user?.password;
    if (!(await bcrypt.compare(password, encryptedPassword))) {
      throw ERROR.INVALID_CREDENTIALS;
    }
    return user;
  }

  async registerUser(request: RegisterRequestDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [
        { email: request.email },
        { phoneNumber: request.phoneNumber },
        { studentId: request.studentId },
      ],
    });

    if (user) {
      throw ERROR.ALREADY_EXISTS;
    }

    const whitelist = await this.whitelistRepository.findOne({
      where: {
        email: request.email,
        studentId: request.studentId,
        name: request.username,
      },
    });

    if (!whitelist) {
      throw ERROR.NOT_WHITELISTED;
    }

    const email = await this.emailRepository.findOne({
      where: { email: request.email },
    });

    if (!email) {
      throw ERROR.NOT_FOUND;
    }

    if (email?.isVerified === false) {
      throw ERROR.UNAUTHORIZED;
    }

    const encryptedPassword = await bcrypt.hash(
      request.password,
      parseInt(this.configService.get('HASH_NUMBER')),
    );
    const newUser = await this.userRepository.save({
      username: request.username,
      email: request.email,
      generation: whitelist.generation,
      password: encryptedPassword,
      phoneNumber: request.phoneNumber,
      studentId: request.studentId,
      badges: [],
    });
    return newUser;
  }

  async forgetPasswordChange(email: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw ERROR.NOT_FOUND;
    } else {
      const generatedPassword = await this.generatePassword();
      this.emailService.sendPasswordResetEmail(email, generatedPassword);
      user.password = await bcrypt.hash(
        generatedPassword,
        parseInt(this.configService.get('HASH_NUMBER')),
      );
      await this.userRepository.save(user);
      return user.id;
    }
  }

  async passwordChange(email: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw ERROR.NOT_FOUND;
    } else {
      user.password = await bcrypt.hash(
        newPassword,
        parseInt(this.configService.get('HASH_NUMBER')),
      );
      await this.userRepository.save(user);
    }
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload: AccessPayload = {
      userId: user.id,
      username: user.username,
      badgeKeys: user.badges.map((badge) => badge._key),
    };
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async refreshAccessToken(userId: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['badges'],
    });
    return await this.generateAccessToken(user);
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload: RefreshPayload = { userId: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    const encryptedRefreshToken = await bcrypt.hash(
      refreshToken,
      parseInt(this.configService.get('HASH_NUMBER')),
    );

    await this.userRepository.update(user.id, {
      refreshToken: encryptedRefreshToken,
    });

    return refreshToken;
  }

  async validateRefreshToken(refreshToken: string): Promise<RefreshPayload> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      }) as RefreshPayload;

      const user = await this.userRepository.findOne({
        where: { id: payload.userId },
      });

      const encryptedRefreshToken = user?.refreshToken;

      if (!(await bcrypt.compare(refreshToken, encryptedRefreshToken))) {
        throw ERROR.INVALID_TOKEN;
      }

      return payload;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        if (err.message === 'jwt expired') {
          throw ERROR.EXPIRED_TOKEN;
        }
        throw ERROR.INVALID_TOKEN;
      } else {
        console.log(err);
        throw ERROR.UNKNOWN;
      }
    }
  }

  async clearRefreshToken(userId: string): Promise<void> {
    await this.userRepository.update({ id: userId }, { refreshToken: null });
  }

  private async generatePassword(): Promise<string> {
    const buffer = randomBytes(7);
    return buffer.toString('hex').toUpperCase().slice(0, 14);
  }

  async changeActivation(
    userId: string,
    activationState: boolean,
  ): Promise<void> {
    await this.userRepository.update(
      { id: userId },
      { activation: activationState },
    );
  }

  async getUsers(): Promise<GetUsersResponseDto[]> {
    const users = await this.userRepository.find({
      relations: ['badges'],
      order: { studentId: 'ASC' },
    });
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      badges: user.badges,
      phoneNumber: user.phoneNumber,
      studentId: user.studentId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      activation: user.activation,
    }));
  }
}
