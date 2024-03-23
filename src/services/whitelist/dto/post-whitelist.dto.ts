import { PickType } from '@nestjs/swagger';
import { Whitelist } from 'src/entities/whitelist.entity';

export class PostWhitelistRequestDto extends PickType(Whitelist, [
  'generation',
  'name',
  'email',
  'studentId',
]) {}

export class PostWhitelistResponseDto extends PickType(Whitelist, ['id']) {}
