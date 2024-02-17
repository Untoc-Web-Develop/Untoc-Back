import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '비밀번호' })
  password: string;

  @ApiProperty({ description: '이름' })
  username: string;

  @ApiProperty({ description: '전화번호' })
  phoneNumber: string;

  @ApiProperty({ description: '학번' })
  studentId: string;
}
