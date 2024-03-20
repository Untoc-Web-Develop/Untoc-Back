import { ApiProperty } from '@nestjs/swagger';

export class SendEmailRequestDto {
  @ApiProperty({ description: '이메일' })
  email: string;
}
