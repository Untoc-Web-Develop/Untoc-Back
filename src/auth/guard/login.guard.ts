import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import ERROR from 'src/common/error';

@Injectable()
export class LoginAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const access_token = request.cookies['accessToken'];
      let payload = await this.jwtService.verify(access_token, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });

      if (!payload) {
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

        payload = await this.jwtService.verify(accessToken);
      }
      request.user = payload;
      return true;
    } catch (err) {
      console.log(err);
      throw ERROR.UNKNOWN;
    }
  }
}
