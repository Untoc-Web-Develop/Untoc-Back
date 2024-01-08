import { BaseEntity } from 'src/entities/base.entity';
import { Schedule } from 'src/entities/schedule.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'schedule_category' })
export class ScheduleCategory extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'color' })
  color: string;

  @OneToMany(() => Schedule, (schedule) => schedule.category)
  schedules: Schedule[];
}
