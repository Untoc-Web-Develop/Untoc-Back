import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Email } from 'src/entities/email.entity';
import { SendEmailRequestDto } from 'src/services/email/dto/post-send.dto';
import { EmailService } from 'src/services/email/email.service';

import { VerifyEmailRequestDto } from './../services/email/dto/post-verify.dto';

@Controller('email')
@ApiTags('Email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send-code')
  @ApiCreatedResponse({
    type: Email,
    description: '이메일 확인 코드 전송',
  })
  async sendVerificationCode(
    @Body() sendEmailRequestDto: SendEmailRequestDto,
  ): Promise<Email> {
    return await this.emailService.sendEmail(sendEmailRequestDto.email);
  }

  @Post('/verify-code')
  @ApiCreatedResponse({
    description: '이메일 확인 코드 확인',
  })
  async verifyEmailCode(
    @Body() verifyEmailRequestDto: VerifyEmailRequestDto,
  ): Promise<boolean> {
    return await this.emailService.verifyEmail(
      verifyEmailRequestDto.email,
      verifyEmailRequestDto.verificationCode,
    );
  }
}
