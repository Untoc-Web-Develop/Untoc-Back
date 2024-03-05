import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'about' })
export class About extends BaseEntity {
  @ApiProperty({ example: '제목', description: '제목' })
  @Column({ name: 'title' })
  title: string;

  @ApiProperty({ example: '내용', description: '내용' })
  @Column({ name: 'content', type: 'mediumtext' })
  content: string;

  @ApiProperty({ example: 1, description: '순서' })
  @Column({ name: 'order', unique: true })
  order: number;
}
