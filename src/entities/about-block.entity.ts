import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'about_block' })
export class AboutBlock extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'value' })
  value: number;

  @Column({ name: 'prefix' })
  prefix: string;

  @Column({ name: 'suffix' })
  suffix: string;
}
