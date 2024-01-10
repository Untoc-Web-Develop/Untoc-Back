import { Column, Entity, OneToMany } from 'typeorm';

import { ApplyValue } from './apply-value.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'apply_question' })
export class ApplyQuestion extends BaseEntity {
  @Column({ type: 'text', name: 'question' })
  question: string;

  @OneToMany(() => ApplyValue, (applyValue) => applyValue.applyQuestion)
  values: ApplyValue[];
}
