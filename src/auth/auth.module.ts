import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { LoginAuthGuard } from 'src/auth/guard/login.guard';
import { User } from 'src/entities/user.entity';
import { Whitelist } from 'src/entities/whitelist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Whitelist])],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, JwtService, LoginAuthGuard],
})
export class AuthModule {}
