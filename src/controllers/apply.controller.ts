import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetApplyQuestionResponseDto } from 'src/services/apply/dto/get-apply-question.dto';
import { GetApplySettingResponseDto } from 'src/services/apply/dto/get-apply-setting.dto';
import { GetApplyResponseDto } from 'src/services/apply/dto/get-apply.dto';
import { PostApplyQuestionResponseDto } from 'src/services/apply/dto/post-apply-question.dto';
import {
  PostApplySettingRequestDto,
  PostApplySettingResponseDto,
} from 'src/services/apply/dto/post-apply-setting.dto';
import { PostApplyRequestDto } from 'src/services/apply/dto/post-apply.dto';

import { ApplyService } from './../services/apply/apply.service';

@Controller('apply')
@ApiTags('Apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get Apply',
    description: 'Get Apply',
  })
  @ApiCreatedResponse({
    description: 'Apply list',
    type: GetApplyResponseDto,
  })
  async findAllApply(): Promise<GetApplyResponseDto> {
    return await this.applyService.findAllApply();
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create Apply',
    description: 'Create Apply',
  })
  @ApiCreatedResponse({
    description: 'Apply created',
  })
  async createApply(@Body() request: PostApplyRequestDto): Promise<void> {
    await this.applyService.createApply(request);
  }

  @Delete('/')
  @ApiOperation({
    summary: 'Delete Apply',
    description: 'Delete Apply',
  })
  @ApiCreatedResponse({
    description: 'Apply deleted',
  })
  async deleteApply(): Promise<void> {
    await this.applyService.deleteAllApply();
  }

  @Get('/apply-setting')
  @ApiOperation({
    summary: 'Get Apply Setting',
    description: 'Get Apply Setting',
  })
  @ApiCreatedResponse({
    description: 'Apply Setting',
    type: GetApplySettingResponseDto,
  })
  async findApplySetting(): Promise<GetApplySettingResponseDto> {
    return await this.applyService.findApplySetting();
  }

  @Post('/apply-setting')
  @ApiOperation({
    summary: 'Create Apply Setting',
    description: 'Create Apply Setting',
  })
  @ApiCreatedResponse({
    description: 'Apply Setting created',
    type: PostApplySettingResponseDto,
  })
  async createApplySetting(
    @Body() request: PostApplySettingRequestDto,
  ): Promise<PostApplySettingResponseDto> {
    return await this.applyService.creteApplySetting(request);
  }

  @Patch('/apply-setting')
  @ApiOperation({
    summary: 'Update Apply Setting',
    description: 'Update Apply Setting',
  })
  @ApiCreatedResponse({
    description: 'Apply Setting updated',
  })
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
  @ApiOperation({
    summary: 'Delete Apply Setting',
    description: 'Delete Apply Setting',
  })
  @ApiCreatedResponse({
    description: 'Apply Setting deleted',
  })
  async deleteApplySetting(@Query('id') id: string): Promise<void> {
    await this.applyService.deleteApplySetting(id);
  }

  @Get('/apply-question')
  @ApiOperation({
    summary: 'Get Apply Question',
    description: 'Get Apply Question',
  })
  @ApiCreatedResponse({
    description: 'Apply Question list',
    type: GetApplyQuestionResponseDto,
  })
  async findAllApplyQuestion(): Promise<GetApplyQuestionResponseDto> {
    return await this.applyService.findAllApplyQuestion();
  }

  @Post('/apply-question')
  @ApiOperation({
    summary: 'Create Apply Question',
    description: 'Create Apply Question',
  })
  @ApiCreatedResponse({
    description: 'Apply Question created',
    type: PostApplyQuestionResponseDto,
  })
  async createApplyQuestion(
    @Body() request: { question: string; description: string },
  ): Promise<PostApplyQuestionResponseDto> {
    return await this.applyService.createApplyQuestion(request);
  }

  @Patch('/apply-question')
  @ApiOperation({
    summary: 'Update Apply Question',
    description: 'Update Apply Question',
  })
  @ApiCreatedResponse({
    description: 'Apply Question updated',
  })
  async updateApplyQuestion(
    @Body()
    request: {
      id: string;
      newApplyQuestion: {
        question: string;
        description: string;
      };
    },
  ): Promise<void> {
    await this.applyService.updateApplyQuestion(
      request.id,
      request.newApplyQuestion,
    );
  }

  @Delete('/apply-question')
  @ApiOperation({
    summary: 'Delete Apply Question',
    description: 'Delete Apply Question',
  })
  @ApiCreatedResponse({
    description: 'Apply Question deleted',
  })
  async deleteApplyQuestion(@Query('id') id: string): Promise<void> {
    await this.applyService.deleteApplyQuestion(id);
  }
}
