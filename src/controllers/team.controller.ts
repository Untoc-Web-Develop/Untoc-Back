import { Controller, Get, UseGuards } from '@nestjs/common';
import { LoginAuthGuard } from 'src/services/auth/guard/login.guard';
import { GetTeamListResponseDto } from 'src/services/team/dto/get-team-list.dto';
import { TeamService } from 'src/services/team/team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('/')
  @UseGuards(LoginAuthGuard)
  async findAll(): Promise<GetTeamListResponseDto> {
    return await this.teamService.findAll();
  }
}
