import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/entities/team.entity';
import { Repository } from 'typeorm';

import { GetTeamListResponseDto } from './dto/get-team-list.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async findAll(): Promise<GetTeamListResponseDto> {
    const teams = await this.teamRepository.find();

    return {
      teams: teams.map((team) => ({
        id: team.id,
        name: team.name,
        member: team.member.map((user) => user.username),
        descriptionTitle: team.descriptionTitle,
        descriptionContent: team.descriptionContent,
        updatedAt: team.updatedAt,
        createdAt: team.createdAt,
      })),
    };
  }
}
