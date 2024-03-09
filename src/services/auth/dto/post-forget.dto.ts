import { ApiProperty } from '@nestjs/swagger';

export class ForgetPasswordRequestDto {
  @ApiProperty({ description: '이메일' })
  email: string;
}
