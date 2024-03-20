import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Team } from './team.entity';

@Entity({ name: 'team_link' })
export class TeamLink extends BaseEntity {
  @ApiProperty({ description: '팀 소개 링크' })
  @Column({ name: 'link' })
  link: string;

  @ManyToOne(() => Team, (team) => team.links, { nullable: true })
  @JoinColumn({ name: 'team_id' })
  team: Team;
}
