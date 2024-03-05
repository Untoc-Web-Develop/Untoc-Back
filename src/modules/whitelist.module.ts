import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { WhitelistController } from 'src/controllers/whitelist.controller';
import { User } from 'src/entities/user.entity';
import { Whitelist } from 'src/entities/whitelist.entity';
import { UserService } from 'src/services/user/user.service';
import { WhitelistService } from 'src/services/whitelist/whitelist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Whitelist, User])],
  controllers: [WhitelistController],
  providers: [
    WhitelistService,
    UserService,
    ConfigService,
    AuthService,
    JwtService,
  ],
})
export class WhitelistModule {}
