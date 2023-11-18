import { Column, Entity, ManyToOne } from 'typeorm';

import { ApplyQuestion } from './apply-question.entity';
import { Apply } from './apply.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'apply_value' })
export class ApplyValue extends BaseEntity {
  @Column({ name: 'value' })
  value: string;

  @ManyToOne(() => Apply, (apply) => apply.id)
  apply: Apply;

  @ManyToOne(() => ApplyQuestion, (applyQuestion) => applyQuestion.id)
  applyQuestion: ApplyQuestion;
}
