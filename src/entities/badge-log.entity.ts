import { ApiProperty } from '@nestjs/swagger';
import { Badge } from 'src/entities/badge.entity';
import { BaseEntityOnlyDate } from 'src/entities/base.entity';
import { User } from 'src/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'badge_log' })
export class BadgeLog extends BaseEntityOnlyDate {
  @ApiProperty({ description: 'id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'is_given' })
  isGiven: boolean;

  @ManyToOne(() => User, (user) => user.badgeLogs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Badge, (badge) => badge.badgeLogs)
  @JoinColumn({ name: 'badge_id' })
  badge: Badge;
}
