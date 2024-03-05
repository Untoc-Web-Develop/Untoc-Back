import { ApiProperty } from '@nestjs/swagger';

export class AccessPayload {
  @ApiProperty({ description: '사용자 고유 UUID' })
  userId: string;

  @ApiProperty({
    description: '사용자 이름',
  })
  username: string;
}
