import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ApplyQuestion } from './apply-question.entity';
import { Apply } from './apply.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'apply_value' })
export class ApplyValue extends BaseEntity {
  @Column({ name: 'value' })
  value: string;

  @ManyToOne(() => Apply, (apply) => apply.applyValues)
  @JoinColumn({ name: 'apply_id' })
  apply: Apply;

  @ManyToOne(() => ApplyQuestion, (applyQuestion) => applyQuestion.values)
  @JoinColumn({ name: 'apply_question_id' })
  applyQuestion: ApplyQuestion;
}
