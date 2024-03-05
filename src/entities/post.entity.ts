import { BaseEntity } from 'src/entities/base.entity';
import { Board } from 'src/entities/board.entity';
import { File } from 'src/entities/file.entity';
import { User } from 'src/entities/user.entity';
import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'post' })
export class Post extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => File, (file) => file.post)
  files: File[];

  @ManyToOne(() => Board, (board) => board.posts)
  @JoinColumn({ name: 'board_id' })
  board: Board;
}
