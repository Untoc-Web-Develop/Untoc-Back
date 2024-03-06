import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
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
import { LoginAuthGuard } from 'src/services/auth/guard/login.guard';
import { UserService } from 'src/services/user/user.service';

import { ApplyService } from './../services/apply/apply.service';

@Controller('apply')
@ApiTags('Apply')
export class ApplyController {
  constructor(
    private readonly applyService: ApplyService,
    private readonly userService: UserService,
  ) {}

  @Get('/')
  @UseGuards(LoginAuthGuard)
  @ApiOperation({
    summary: 'Get Apply',
    description: 'Get Apply',
  })
  @ApiCreatedResponse({
    description: 'Apply list',
    type: GetApplyResponseDto,
  })
  async findAllApply(@Request() req): Promise<GetApplyResponseDto> {
    const userId = req.user.userId;
    if (await this.userService.checkBadgeForAuth(userId, 'admin')) {
      return await this.applyService.findAllApply();
    }
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create Apply',
    description: 'Create Apply',
  })
  @ApiCreatedResponse({
    description: 'Apply created',
  })
  async createApply(@Body() body: PostApplyRequestDto): Promise<void> {
    await this.applyService.createApply(body);
  }

  @Delete('/')
  @UseGuards(LoginAuthGuard)
  @ApiOperation({
    summary: 'Delete Apply',
    description: 'Delete Apply',
  })
  @ApiCreatedResponse({
    description: 'Apply deleted',
  })
  async deleteApply(@Request() req): Promise<void> {
    const userId = req.user.userId;
    if (await this.userService.checkBadgeForAuth(userId, 'admin')) {
      await this.applyService.deleteAllApply();
    }
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
  @UseGuards(LoginAuthGuard)
  @ApiOperation({
    summary: 'Create Apply Setting',
    description: 'Create Apply Setting',
  })
  @ApiCreatedResponse({
    description: 'Apply Setting created',
    type: PostApplySettingResponseDto,
  })
  async createApplySetting(
    @Request() req,
    @Body() body: PostApplySettingRequestDto,
  ): Promise<PostApplySettingResponseDto> {
    const userId = req.user.userId;
    if (await this.userService.checkBadgeForAuth(userId, 'admin')) {
      return await this.applyService.creteApplySetting(body);
    }
  }

  @Patch('/apply-setting')
  @UseGuards(LoginAuthGuard)
  @ApiOperation({
    summary: 'Update Apply Setting',
    description: 'Update Apply Setting',
  })
  @ApiCreatedResponse({
    description: 'Apply Setting updated',
  })
  async updateApplySetting(
    @Request() req,
    @Body()
    body: {
      id: string;
      newApplySetting: PostApplySettingRequestDto;
    },
  ): Promise<void> {
    const userId = req.user.userId;
    if (await this.userService.checkBadgeForAuth(userId, 'admin')) {
      await this.applyService.updateApplySetting(body.id, body.newApplySetting);
    }
  }

  @Delete('/apply-setting')
  @UseGuards(LoginAuthGuard)
  @ApiOperation({
    summary: 'Delete Apply Setting',
    description: 'Delete Apply Setting',
  })
  @ApiCreatedResponse({
    description: 'Apply Setting deleted',
  })
  async deleteApplySetting(
    @Request() req,
    @Query('id') id: string,
  ): Promise<void> {
    const userId = req.user.userId;
    if (await this.userService.checkBadgeForAuth(userId, 'admin')) {
      await this.applyService.deleteApplySetting(id);
    }
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
  @UseGuards(LoginAuthGuard)
  @ApiOperation({
    summary: 'Create Apply Question',
    description: 'Create Apply Question',
  })
  @ApiCreatedResponse({
    description: 'Apply Question created',
    type: PostApplyQuestionResponseDto,
  })
  async createApplyQuestion(
    @Request() req,
    @Body() body: { question: string; description: string },
  ): Promise<PostApplyQuestionResponseDto> {
    const userId = req.user.userId;
    if (await this.userService.checkBadgeForAuth(userId, 'admin')) {
      return await this.applyService.createApplyQuestion(body);
    }
  }

  @Patch('/apply-question')
  @UseGuards(LoginAuthGuard)
  @ApiOperation({
    summary: 'Update Apply Question',
    description: 'Update Apply Question',
  })
  @ApiCreatedResponse({
    description: 'Apply Question updated',
  })
  async updateApplyQuestion(
    @Request() req,
    @Body()
    body: {
      id: string;
      newApplyQuestion: {
        question: string;
        description: string;
      };
    },
  ): Promise<void> {
    const userId = req.user.userId;
    if (await this.userService.checkBadgeForAuth(userId, 'admin')) {
      await this.applyService.updateApplyQuestion(
        body.id,
        body.newApplyQuestion,
      );
    }
  }

  @Delete('/apply-question')
  @UseGuards(LoginAuthGuard)
  @ApiOperation({
    summary: 'Delete Apply Question',
    description: 'Delete Apply Question',
  })
  @ApiCreatedResponse({
    description: 'Apply Question deleted',
  })
  async deleteApplyQuestion(
    @Request() req,
    @Query('id') id: string,
  ): Promise<void> {
    const userId = req.user.userId;
    if (await this.userService.checkBadgeForAuth(userId, 'admin')) {
      await this.applyService.deleteApplyQuestion(id);
    }
  }
}
