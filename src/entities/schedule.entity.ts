import { BaseEntity } from 'src/entities/base.entity';
import { ScheduleCategory } from 'src/entities/schedule-category.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'schedule' })
export class Schedule extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'start_date', type: 'timestamp' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date;

  @ManyToOne(() => ScheduleCategory, (category) => category.schedules)
  category: ScheduleCategory;
}
