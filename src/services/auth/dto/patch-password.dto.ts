import { ApiProperty } from '@nestjs/swagger';

export class PasswordChangeRequestDto {
  @ApiProperty({ description: '이메일' })
  email: string;
  @ApiProperty({ description: '비밀번호' })
  newPassword: string;
}
