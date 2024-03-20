import { BaseEntity } from 'src/entities/base.entity';
import { Post } from 'src/entities/post.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'board' })
export class Board extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @OneToMany(() => Post, (post) => post.board, { nullable: true })
  posts: Post[];

  @Column({ name: 'discordHook' })
  discordHook: boolean;
}
