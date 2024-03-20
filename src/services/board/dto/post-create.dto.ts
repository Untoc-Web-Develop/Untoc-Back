import { PickType } from '@nestjs/swagger';
import { baseDtoKey } from 'src/entities/base.entity';
import { Board } from 'src/entities/board.entity';

export class BoardCreateRequestDto extends PickType(Board, [
  ...baseDtoKey,
  'title',
  'discordHook',
]) {}

export class BoardCreateResponseDto extends PickType(Board, ['id']) {}
