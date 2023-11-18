import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyQuestion } from 'src/entities/apply-question.entity';
import { ApplySetting } from 'src/entities/apply-setting.entity';
import { ApplyValue } from 'src/entities/apply-value.entity';
import { Apply } from 'src/entities/apply.entity';
import { Repository } from 'typeorm';

import { GetApplySettingResponseDto } from './dto/get-apply-setting.dto';
import {
  PostApplySettingRequestDto,
  PostApplySettingResponseDto,
} from './dto/post-apply-setting.dto';

@Injectable()
export class ApplyService {
  constructor(
    @InjectRepository(Apply)
    private readonly applyRepository: Repository<Apply>,

    @InjectRepository(ApplyValue)
    private readonly applyValueRepository: Repository<ApplyValue>,

    @InjectRepository(ApplyQuestion)
    private readonly applyQuestionRepository: Repository<ApplyQuestion>,

    @InjectRepository(ApplySetting)
    private readonly applySettingRepository: Repository<ApplySetting>,
  ) {}

  async creteApplySetting(
    newApplySetting: PostApplySettingRequestDto,
  ): Promise<PostApplySettingResponseDto> {
    const applySetting = await this.applySettingRepository.save(
      newApplySetting,
    );

    return {
      id: applySetting.id,
    };
  }

  async findAllApplySetting(): Promise<GetApplySettingResponseDto> {
    const applySettings: Array<ApplySetting> =
      await this.applySettingRepository.find();

    return applySettings.map((applySetting) => ({
      id: applySetting.id,
      generation: applySetting.generation,
      openAt: applySetting.openAt,
      closeAt: applySetting.closeAt,
      content: applySetting.content,
      createdAt: applySetting.createdAt,
      updatedAt: applySetting.updatedAt,
    }));
  }

  async updateApplySetting(
    id: string,
    newApplySetting: PostApplySettingRequestDto,
  ): Promise<void> {
    await this.applySettingRepository.update({ id: id }, newApplySetting);
  }

  async deleteApplySetting(id: string): Promise<void> {
    await this.applySettingRepository.delete({ id: id });
  }
}
