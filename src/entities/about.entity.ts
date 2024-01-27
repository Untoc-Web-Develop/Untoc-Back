import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'about' })
export class About extends BaseEntity {
  @Column({ name: 'content', type: 'mediumtext' })
  content: string;
}
