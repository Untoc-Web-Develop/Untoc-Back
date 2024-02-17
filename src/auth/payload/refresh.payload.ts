import { ApiProperty } from '@nestjs/swagger';

export class RefreshPayload {
  @ApiProperty({ description: '사용자 고유 UUID' })
  userId: string;
}
