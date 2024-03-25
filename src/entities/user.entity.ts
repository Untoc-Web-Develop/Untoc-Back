import { BadgeLog } from 'src/entities/badge-log.entity';
import { Badge } from 'src/entities/badge.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { Post } from 'src/entities/post.entity';
import { Team } from 'src/entities/team.entity';
import { Vote } from 'src/entities/vote.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'generation' })
  generation: number;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;

  @Column({ name: 'student_id', unique: true })
  studentId: string;

  @Column({ name: 'activation', default: true })
  activation: boolean;

  @ManyToMany(() => Badge, (badge) => badge.users)
  @JoinTable({ name: 'user_badge' })
  badges: Badge[];

  @OneToMany(() => BadgeLog, (badgeLog) => badgeLog.user)
  badgeLogs: BadgeLog[];

  @OneToMany(() => Team, (team) => team.leader)
  leadTeams: Team[];

  @ManyToMany(() => Team, (team) => team.member)
  @JoinTable({ name: 'user_team' })
  teams: Team[];

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.voter)
  votes: Vote[];
}
