import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyQuestion } from 'src/entities/apply-question.entity';
import { ApplySetting } from 'src/entities/apply-setting.entity';
import { ApplyValue } from 'src/entities/apply-value.entity';
import { Apply } from 'src/entities/apply.entity';
import { Repository } from 'typeorm';

import { GetApplyQuestionResponseDto } from './dto/get-apply-question.dto';
import { GetApplySettingResponseDto } from './dto/get-apply-setting.dto';
import { GetApplyResponseDto } from './dto/get-apply.dto';
import { PostApplyQuestionResponseDto } from './dto/post-apply-question.dto';
import {
  PostApplySettingRequestDto,
  PostApplySettingResponseDto,
} from './dto/post-apply-setting.dto';
import { PostApplyRequestDto } from './dto/post-apply.dto';

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

  async createApplyQuestion(newApplyQuestion: {
    question: string;
    description: string;
  }): Promise<PostApplyQuestionResponseDto> {
    const applyQuestion = await this.applyQuestionRepository.save({
      question: newApplyQuestion.question,
      description: newApplyQuestion.description,
    });

    return {
      id: applyQuestion.id,
    };
  }

  async findAllApplyQuestion(): Promise<GetApplyQuestionResponseDto> {
    const applyQuestions: ApplyQuestion[] =
      await this.applyQuestionRepository.find({ order: { createdAt: 'ASC' } });

    return {
      applyQuestions: applyQuestions.map((applyQuestion) => ({
        id: applyQuestion.id,
        question: applyQuestion.question,
        description: applyQuestion.description,
      })),
    };
  }

  async updateApplyQuestion(
    id: string,
    newApplyQuestion: {
      question: string;
      description: string;
    },
  ): Promise<void> {
    await this.applyQuestionRepository.update(
      { id: id },
      {
        question: newApplyQuestion.question,
        description: newApplyQuestion.description,
      },
    );
  }

  async deleteApplyQuestion(id: string): Promise<void> {
    await this.applyQuestionRepository.delete({ id: id });
  }

  async createApply(apply: PostApplyRequestDto): Promise<void> {
    const createdApply = await this.applyRepository.save({
      name: apply.name,
      studentId: apply.studentId,
      phoneNumber: apply.phoneNumber,
      email: apply.email,
      applyValues: [],
    });

    await Promise.all(
      apply.applyValues.map(async (applyValue) => {
        await this.applyValueRepository.save({
          value: applyValue.value,
          apply: createdApply,
          applyQuestion: applyValue.applyQuestion,
        });
      }),
    );
  }

  async findAllApply(): Promise<GetApplyResponseDto> {
    const applies: Apply[] = await this.applyRepository.find({
      relations: ['applyValues', 'applyValues.applyQuestion'],
    });

    return {
      applies: applies.map((apply) => ({
        id: apply.id,
        name: apply.name,
        studentId: apply.studentId,
        phoneNumber: apply.phoneNumber,
        email: apply.email,
        applyValues: apply.applyValues.map((applyValue) => ({
          applyQuestion: applyValue.applyQuestion.id,
          value: applyValue.value,
        })),
        createdAt: apply.createdAt,
        updatedAt: apply.updatedAt,
      })),
    };
  }

  async deleteAllApply(): Promise<void> {
    await this.applyValueRepository.delete({});
    await this.applyRepository.delete({});
  }
}
