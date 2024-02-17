import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { LoginPayload } from 'src/auth/payload/login.payload';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: LoginPayload, done: VerifiedCallback): Promise<any> {
    return done(null, payload);
  }
}
