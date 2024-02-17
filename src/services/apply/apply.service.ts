import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyQuestion } from 'src/entities/apply-question.entity';
import { ApplySetting } from 'src/entities/apply-setting.entity';
import { ApplyValue } from 'src/entities/apply-value.entity';
import { Apply } from 'src/entities/apply.entity';
import { Repository } from 'typeorm';

import { GetApplyQuestionResponseDto } from './dto/get-apply-question.dto';
import { GetApplySettingResponseDto } from './dto/get-apply-setting.dto';
import { PostApplyQuestionResponseDto } from './dto/post-apply-question.dto';
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

  async findApplySetting(): Promise<GetApplySettingResponseDto> {
    const applySettings: ApplySetting[] =
      await this.applySettingRepository.find();

    if (applySettings.length === 0) {
      throw new HttpException('Not Found', 404);
    }
    return applySettings[0];
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

  async createApplyQuestion(
    newApplyQuestion: string,
  ): Promise<PostApplyQuestionResponseDto> {
    const applyQuestion = await this.applyQuestionRepository.save({
      question: newApplyQuestion,
    });

    return {
      id: applyQuestion.id,
    };
  }

  async findAllApplyQuestion(): Promise<GetApplyQuestionResponseDto> {
    const applyQuestions: Array<ApplyQuestion> =
      await this.applyQuestionRepository.find();

    return applyQuestions.map((applyQuestion) => ({
      id: applyQuestion.id,
      question: applyQuestion.question,
    }));
  }

  async updateApplyQuestion(
    id: string,
    newApplyQuestion: string,
  ): Promise<void> {
    await this.applyQuestionRepository.update(
      { id: id },
      { question: newApplyQuestion },
    );
  }

  async deleteApplyQuestion(id: string): Promise<void> {
    await this.applyQuestionRepository.delete({ id: id });
  }
}
