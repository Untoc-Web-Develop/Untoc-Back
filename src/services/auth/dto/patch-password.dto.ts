import { ApiProperty } from '@nestjs/swagger';

export class PasswordChangeRequestDto {
  @ApiProperty({ description: '비밀번호 재설정 이메일' })
  email: string;
  @ApiProperty({ description: '재설정 비밀번호' })
  newPassword: string;
}
