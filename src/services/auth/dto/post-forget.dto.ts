import { ApiProperty } from '@nestjs/swagger';

export class ForgetPasswordRequestDto {
  @ApiProperty({ description: '비밀번호 재설정을 위한 확인 코드 전송 이메일' })
  email: string;
}
