import { Badge } from 'src/entities/badge.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { User } from 'src/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'badge_log' })
export class BadgeLog extends BaseEntity {
  @Column({ name: 'is_given' })
  isGiven: boolean;

  @ManyToOne(() => User, (user) => user.badgeLogs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Badge, (badge) => badge.badgeLogs)
  @JoinColumn({ name: 'badge_id' })
  badge: Badge;
}
