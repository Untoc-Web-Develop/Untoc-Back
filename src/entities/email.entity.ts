import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'email' })
export class Email extends BaseEntity {
  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ name: 'verification_code' })
  verificationCode: string;
}
