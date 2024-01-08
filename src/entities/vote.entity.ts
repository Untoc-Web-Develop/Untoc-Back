import { BaseEntity } from 'src/entities/base.entity';
import { User } from 'src/entities/user.entity';
import { Meetup } from 'src/entities/meetup.entity';
import { Team } from 'src/entities/team.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'vote' })
export class Vote extends BaseEntity {
  @ManyToOne(() => Meetup, (meetup) => meetup.votes)
  @JoinColumn({ name: 'meetup_id' })
  meetup: Meetup;

  @ManyToOne(() => User, (user) => user.votes)
  @JoinColumn({ name: 'vote_user' })
  voter: User;

  @ManyToOne(() => Team, (team) => team.votes)
  @JoinColumn({ name: 'selected_team_id' })
  selectedTeam: Team;
}
