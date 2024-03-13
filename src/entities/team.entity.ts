import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/entities/base.entity';
import { File } from 'src/entities/file.entity';
import { Meetup } from 'src/entities/meetup.entity';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'team' })
export class Team extends BaseEntity {
  @ApiProperty({ description: '팀 이름' })
  @Column({ name: 'name' })
  name: string;

  @ApiProperty({ description: '팀장' })
  @ManyToOne(() => User, (user) => user.leadTeams)
  @JoinColumn({ name: 'leader_id' })
  leader: User;

  @ApiProperty({ description: '팀원' })
  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable({ name: 'user_team' })
  member: User[];

  @ApiProperty({ description: '팀 설명 제목' })
  @Column({ name: 'description_title' })
  descriptionTitle: string;

  @ApiProperty({ description: '팀 설명 내용' })
  @Column({ name: 'description_content' })
  descriptionContent: string;

  @OneToMany(() => File, (file) => file.team)
  files: File[];

  @OneToMany(() => Vote, (vote) => vote.selectedTeam)
  votes: Vote[];

  @ManyToMany(() => Meetup, (meetup) => meetup.teams)
  @JoinTable({ name: 'team_meetup' })
  meetup: Meetup[];
}
