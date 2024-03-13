import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAuthGuard } from 'src/services/auth/guard/login.guard';
import { GetTeamListResponseDto } from 'src/services/team/dto/get-team-list.dto';
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
}
