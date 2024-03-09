import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailRequestDto {
  @ApiProperty({ description: '이메일' })
  email: string;
  @ApiProperty({ description: '인증 코드' })
  verificationCode: string;
}
