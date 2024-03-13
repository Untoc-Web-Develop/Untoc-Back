import { BaseEntity } from 'src/entities/base.entity';
import { Board } from 'src/entities/board.entity';
import { File } from 'src/entities/file.entity';
import { User } from 'src/entities/user.entity';
import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'post' })
export class Post extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content', type: 'longtext' })
  content: string;

  @ManyToOne(() => User, (user) => user.posts, { nullable: false })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => File, (file) => file.post, { nullable: true })
  files: File[];

  @ManyToOne(() => Board, (board) => board.posts, { nullable: false })
  @JoinColumn({ name: 'board_id' })
  board: Board;
}
