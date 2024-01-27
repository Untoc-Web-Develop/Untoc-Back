import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { GetApplyQuestionResponseDto } from 'src/services/apply/dto/get-apply-question.dto';
import { PostApplyQuestionResponseDto } from 'src/services/apply/dto/post-apply-question.dto';

import { ApplyService } from './../services/apply/apply.service';

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

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
