import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ERROR from 'src/common/error';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable()
export class LoginAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const access_token = request.cookies['accessToken'];

      if (!access_token) {
        throw ERROR.NEED_LOGIN;
      }

      const payload = await this.jwtService.verify(access_token, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });

      request.user = payload;
      return true;
    } catch (err) {
      if (err.name === 'HttpException') {
        throw err;
      } else if (err.name === 'JsonWebTokenError') {
        if (err.message === 'invalid token') {
          throw ERROR.INVALID_TOKEN;
        }
        const refreshPayload = await this.authService.validateRefreshToken(
          request.cookies['refreshToken'],
        );

        if (!refreshPayload) {
          throw ERROR.INVALID_TOKEN;
        }

        const accessToken = await this.authService.refreshAccessToken(
          refreshPayload.userId,
        );

        request.res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });

        const payload = await this.jwtService.verify(accessToken, {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
        });
        request.user = payload;
        return true;
      } else {
        console.log(err);
        throw ERROR.UNKNOWN;
      }
    }
  }
}
