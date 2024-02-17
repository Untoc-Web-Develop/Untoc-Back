import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { GetApplyQuestionResponseDto } from 'src/services/apply/dto/get-apply-question.dto';
import { GetApplySettingResponseDto } from 'src/services/apply/dto/get-apply-setting.dto';
import { PostApplyQuestionResponseDto } from 'src/services/apply/dto/post-apply-question.dto';
import {
  PostApplySettingRequestDto,
  PostApplySettingResponseDto,
} from 'src/services/apply/dto/post-apply-setting.dto';

import { ApplyService } from './../services/apply/apply.service';

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Get('/apply-setting')
  async findApplySetting(): Promise<GetApplySettingResponseDto> {
    return await this.applyService.findApplySetting();
  }

  @Post('/apply-setting')
  async createApplySetting(
    @Body() request: PostApplySettingRequestDto,
  ): Promise<PostApplySettingResponseDto> {
    return await this.applyService.creteApplySetting(request);
  }

  @Patch('/apply-setting')
  async updateApplySetting(
    @Body()
    request: {
      id: string;
      newApplySetting: PostApplySettingRequestDto;
    },
  ): Promise<void> {
    await this.applyService.updateApplySetting(
      request.id,
      request.newApplySetting,
    );
  }

  @Delete('/apply-setting')
  async deleteApplySetting(@Body() request: { id: string }): Promise<void> {
    await this.applyService.deleteApplySetting(request.id);
  }

  @Get('/apply-question')
  async findAllApplyQuestion(): Promise<GetApplyQuestionResponseDto> {
    return await this.applyService.findAllApplyQuestion();
  }

  @Post('/apply-question')
  async createApplyQuestion(
    @Body() request: { question: string },
  ): Promise<PostApplyQuestionResponseDto> {
    return await this.applyService.createApplyQuestion(request.question);
  }

  @Patch('/apply-question')
  async updateApplyQuestion(
    @Body() request: { id: string; question: string },
  ): Promise<void> {
    await this.applyService.updateApplyQuestion(request.id, request.question);
  }

  @Delete('/apply-question')
  async deleteApplyQuestion(@Body() request: { id: string }): Promise<void> {
    await this.applyService.deleteApplyQuestion(request.id);
  }
}
