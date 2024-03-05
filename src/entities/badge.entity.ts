import { BadgeLog } from 'src/entities/badge-log.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { File } from 'src/entities/file.entity';
import { User } from 'src/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'badge' })
export class Badge extends BaseEntity {
  @Column({ name: '_key', unique: true })
  _key: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @OneToOne(() => File, (file) => file.badge)
  @JoinColumn({ name: 'icon' })
  icon: File;

  @ManyToMany(() => User, (user) => user.badges)
  @JoinTable({ name: 'user_badge' })
  users: User[];

  @OneToMany(() => BadgeLog, (badgeLog) => badgeLog.badge)
  badgeLogs: BadgeLog[];
}
