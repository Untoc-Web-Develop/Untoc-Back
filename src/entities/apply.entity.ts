import { Column, Entity, OneToMany } from 'typeorm';

import { ApplyValue } from './apply-value.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'apply' })
export class Apply extends BaseEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'student_id' })
  studentId: string;

  @Column({ name: 'phone_number' })
  phone_number: string;

  @Column({ name: 'email' })
  email: string;

  @OneToMany(() => ApplyValue, (applyValue) => applyValue.apply)
  applyValues: ApplyValue[];
}
