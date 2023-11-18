import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'apply_setting' })
export class ApplySetting extends BaseEntity {
  @Column({ name: 'generation', unique: true })
  generation: number;

  @Column({ name: 'open_at' })
  openAt: Date;

  @Column({ name: 'close_at' })
  closeAt: Date;

  @Column({ name: 'content ' })
  content: string;
}
