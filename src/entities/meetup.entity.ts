import { BaseEntity } from 'src/entities/base.entity';
import { Team } from 'src/entities/team.entity';
import { Vote } from 'src/entities/vote.entity';
import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity('meetup')
export class Meetup extends BaseEntity {
  @ManyToMany(() => Team, (team) => team.meetup)
  @JoinTable({ name: 'team_meetup' })
  teams: Team[];

  @OneToMany(() => Vote, (vote) => vote.meetup)
  votes: Vote[];
}
