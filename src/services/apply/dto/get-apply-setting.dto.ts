import { BaseDto } from 'src/common/dto/base.dto';

class ApplySettingDto extends BaseDto {
  generation: number;
  openAt: Date;
  closeAt: Date;
  content: string;
}

export class GetApplySettingResponseDto extends ApplySettingDto {}
