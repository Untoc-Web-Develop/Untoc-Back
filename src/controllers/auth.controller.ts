import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from 'src/services/auth/auth.service';
import { LoginRequestDto } from 'src/services/auth/dto/login.dto';
import { RegisterRequestDto } from 'src/services/auth/dto/register.dto';
import { LoginAuthGuard } from 'src/services/auth/guard/login.guard';
import { AccessPayload } from 'src/services/auth/payload/access.payload';

@Controller('')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({
    type: LoginRequestDto,
    description: '이메일과 비밀번호로 로그인',
  })
  @ApiCreatedResponse({
    description: '로그인 성공',
    type: AccessPayload,
  })
  async login(
    @Body() { email, password }: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessPayload> {
    const user = await this.authService.validateUser(email, password);
    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);

    res.setHeader('Authorization', 'Bearer ' + [accessToken, refreshToken]);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return {
      userId: user.id,
      username: user.username,
    };
  }

  @Post('/register')
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({
    type: RegisterRequestDto,
    description: '회원가입',
  })
  @ApiCreatedResponse({
    description: '회원가입 성공',
    type: AccessPayload,
  })
  async register(
    @Body() request: RegisterRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.registerUser(request);
    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);

    res.setHeader('Authorization', 'Bearer ' + [accessToken, refreshToken]);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return {
      userId: user.id,
      username: user.username,
    };
  }

  @Get('/login-check')
  @ApiOperation({ summary: '로그인 체크' })
  @UseGuards(LoginAuthGuard)
  async loginCheck(@Req() req: Request) {
    return req.user;
  }

  @Delete('/logout')
  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(LoginAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    await this.authService.clearRefreshToken(
      (req.user as AccessPayload).userId,
    );
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }
}
