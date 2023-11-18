import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'apply_question' })
export class ApplyQuestion extends BaseEntity {
  @Column({ type: 'text', name: 'question' })
  question: string;
}
