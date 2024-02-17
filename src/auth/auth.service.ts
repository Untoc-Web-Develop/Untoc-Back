import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import ERROR from 'src/ common/error';
import { RegisterRequestDto } from 'src/auth/dto/register.dto';
import { AccessPayload } from 'src/auth/payload/access.payload';
import { RefreshPayload } from 'src/auth/payload/refresh.payload';
import { User } from 'src/entities/user.entity';
import { Whitelist } from 'src/entities/whitelist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Whitelist)
    private readonly whitelistRepository: Repository<Whitelist>,

    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
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

    const whitelist = await this.whitelistRepository.find({
      where: {
        email: request.email,
        studentId: request.studentId,
        phoneNumber: request.phoneNumber,
      },
    });

    if (whitelist.length === 0) {
      throw ERROR.NOT_WHITELISTED;
    }

    const encryptedPassword = await bcrypt.hash(
      request.password,
      parseInt(this.configService.get('HASH_NUMBER')),
    );
    const newUser = await this.userRepository.save({
      username: request.username,
      email: request.email,
      password: encryptedPassword,
      phoneNumber: request.phoneNumber,
      studentId: request.studentId,
    });
    return newUser;
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload: AccessPayload = { userId: user.id, username: user.username };
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async refreshAccessToken(userId: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
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
  }

  async clearRefreshToken(userId: string): Promise<void> {
    await this.userRepository.update({ id: userId }, { refreshToken: null });
  }
}
