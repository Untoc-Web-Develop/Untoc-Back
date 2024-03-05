import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ERROR from 'src/common/error';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async checkBadgeForAuth(userId: string, badge_key: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['badges'],
    });

    if (!user) {
      throw ERROR.INVALID_TOKEN;
    }

    if (!user.badges.find((badge) => badge._key === badge_key)) {
      throw ERROR.UNAUTHORIZED;
    }

    return true;
  }
}
