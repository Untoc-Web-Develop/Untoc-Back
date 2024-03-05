import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'history' })
export class History extends BaseEntity {
  @ApiProperty({ example: '제목', description: '제목' })
  @Column({ name: 'title' })
  title: string;

  @ApiProperty({ example: '2024-1', description: '년도' })
  @Column({ name: 'year' })
  year: string;

  @ApiProperty({ example: '내용', description: '내용' })
  @Column({ name: 'contents' })
  contents: string;
}
