import { PickType } from '@nestjs/swagger';
import { Whitelist } from 'src/entities/whitelist.entity';

export class PostWhitelistRequestDto extends PickType(Whitelist, [
  'phoneNumber',
  'email',
  'studentId',
]) {}

export class PostWhitelistResponseDto extends PickType(Whitelist, ['id']) {}
