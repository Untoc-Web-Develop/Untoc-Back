import { BaseEntity } from 'src/entities/base.entity';
import { User } from 'src/entities/user.entity';
import { File } from 'src/entities/file.entity';
import { Vote } from 'src/entities/vote.entity';
import { Meetup } from 'src/entities/meetup.entity';
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
  @Column({ name: 'name' })
  name: string;

  @ManyToOne(() => User, (user) => user.leadTeams)
  @JoinColumn({ name: 'leader_id' })
  leader: User;

  @ManyToMany(() => User, (user) => user.teams)
  @JoinTable({ name: 'user_team' })
  member: User[];

  @Column({ name: 'description_title' })
  descriptionTitle: string;

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
