import { PickType } from '@nestjs/swagger';
import { ApplySetting } from 'src/entities/apply-setting.entity';

export class PostApplySettingRequestDto extends PickType(ApplySetting, [
  'generation',
  'openAt',
  'closeAt',
  'content',
]) {}

export class PostApplySettingResponseDto extends PickType(ApplySetting, [
  'id',
]) {}
