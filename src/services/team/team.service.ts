import { link } from 'fs';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/entities/team.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import { TeamLink } from './../../entities/team-link.entity';
import { GetTeamListResponseDto } from './dto/get-team-list.dto';
import { GetTeamResponseDto } from './dto/get-team.dto';
import { PostTeamRequestDto, PostTeamResponseDto } from './dto/post-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(TeamLink)
    private readonly teamLinkRepository: Repository<TeamLink>,

    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async findAll(): Promise<GetTeamListResponseDto> {
    const teams = await this.teamRepository.find({
      relations: ['member', 'leader', 'links'],
    });

    return {
      teams: teams.map((team) => ({
        id: team.id,
        name: team.name,
        leader: team.leader.username,
        member: team.member.map((user) => user.username),
        descriptionTitle: team.descriptionTitle,
        descriptionContent: team.descriptionContent,
        links: team.links.map((link) => link.link),
        updatedAt: team.updatedAt,
        createdAt: team.createdAt,
      })),
    };
  }

  async createTeam(
    leaderId: string,
    { team }: PostTeamRequestDto,
  ): Promise<PostTeamResponseDto> {
    const leader = await this.UserRepository.findOne({
      relations: ['leadTeams'],
      where: { id: leaderId },
    });
    const member = await Promise.all(
      team.member.map((memberId) =>
        this.UserRepository.findOne({
          relations: ['teams'],
          where: { id: memberId },
        }),
      ),
    );

    const newTeam = await this.teamRepository.save({
      name: team.name,
      descriptionTitle: team.descriptionTitle,
      descriptionContent: team.descriptionContent,
      leader,
    });

    member.forEach((user) => {
      user.teams.push(newTeam);
    });
    await this.UserRepository.save(member);

    await Promise.all(
      team.links.map((link) => {
        return this.teamLinkRepository.save({ link: link, team: newTeam });
      }),
    );

    return { id: newTeam.id };
  }

  async findTeamById(id: string): Promise<GetTeamResponseDto> {
    const team = await this.teamRepository.findOne({
      relations: ['member', 'leader', 'links'],
      where: { id: id },
    });

    return {
      team: {
        id: team.id,
        name: team.name,
        leader: team.leader.username,
        member: team.member.map((user) => user.username),
        descriptionTitle: team.descriptionTitle,
        descriptionContent: team.descriptionContent,
        links: team.links,
        updatedAt: team.updatedAt,
        createdAt: team.createdAt,
      },
    };
  }
}
