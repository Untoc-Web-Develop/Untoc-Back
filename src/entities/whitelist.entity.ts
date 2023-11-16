import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'whitelist' })
export class Whitelist extends BaseEntity {
  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'student_id', unique: true })
  studentId: string;
}
