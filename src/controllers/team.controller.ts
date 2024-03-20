import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAuthGuard } from 'src/services/auth/guard/login.guard';
import { GetTeamListResponseDto } from 'src/services/team/dto/get-team-list.dto';
import { GetTeamResponseDto } from 'src/services/team/dto/get-team.dto';
import {
  PostTeamRequestDto,
  PostTeamResponseDto,
} from 'src/services/team/dto/post-team.dto';
import { TeamService } from 'src/services/team/team.service';

@Controller('team')
@ApiTags('Team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/')
  @UseGuards(LoginAuthGuard)
  @ApiOperation({
    summary: '전체 팀 목록 조회',
    description: '모든 팀 목록을 조회합니다.',
  })
  @ApiCreatedResponse({
    description: '팀 목록',
    type: GetTeamListResponseDto,
  })
  async findAll(): Promise<GetTeamListResponseDto> {
    return await this.teamService.findAll();
  }

  @Post('/')
  @UseGuards(LoginAuthGuard)
  @ApiOperation({
    summary: '팀 생성',
    description: '팀을 생성합니다.',
  })
  @ApiCreatedResponse({
    description: '생성된 팀의 id',
    type: PostTeamResponseDto,
  })
  async createTeam(
    @Request() req,
    @Body() body: PostTeamRequestDto,
  ): Promise<PostTeamResponseDto> {
    const userId = req.user.userId;
    return await this.teamService.createTeam(userId, body);
  }

  @Get('/:teamId')
  @UseGuards(LoginAuthGuard)
  @ApiOperation({
    summary: '팀 조회',
    description: '팀 id를 통해 팀 정보를 조회합니다.',
  })
  @ApiCreatedResponse({
    description: '팀 정보',
    type: GetTeamResponseDto,
  })
  async findTeamById(
    @Param('teamId') teamId: string,
  ): Promise<GetTeamResponseDto> {
    return await this.teamService.findTeamById(teamId);
  }
}
