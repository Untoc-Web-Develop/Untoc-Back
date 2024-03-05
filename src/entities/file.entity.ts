import { Badge } from 'src/entities/badge.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { Post } from 'src/entities/post.entity';
import { Team } from 'src/entities/team.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'file' })
export class File extends BaseEntity {
  @Column({ name: 'link' })
  link: string;

  @OneToOne(() => Badge, (badge) => badge.icon)
  badge: Badge;

  @ManyToOne(() => Post, (post) => post.files, { nullable: true })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => Team, (team) => team.files, { nullable: true })
  @JoinColumn({ name: 'team_id' })
  team: Team;
}
