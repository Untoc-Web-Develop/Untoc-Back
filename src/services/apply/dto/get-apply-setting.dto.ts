import { PickType } from '@nestjs/swagger';
import { ApplySetting } from 'src/entities/apply-setting.entity';
import { baseDtoKey } from 'src/entities/base.entity';

export class GetApplySettingResponseDto extends PickType(ApplySetting, [
  ...baseDtoKey,
  'generation',
  'openAt',
  'closeAt',
  'content',
]) {}
