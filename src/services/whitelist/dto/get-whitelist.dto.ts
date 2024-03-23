import { ApiProperty, PickType } from '@nestjs/swagger';
import { baseDtoKey } from 'src/entities/base.entity';
import { Whitelist } from 'src/entities/whitelist.entity';

class WhiteListDto extends PickType(Whitelist, [
  ...baseDtoKey,
  'name',
  'email',
  'studentId',
]) {}

export class GetWhiteListResponseDto {
  @ApiProperty({ type: [WhiteListDto] })
  whitelists: WhiteListDto[];
}
