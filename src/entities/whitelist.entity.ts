import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'whitelist' })
export class Whitelist extends BaseEntity {
  @ApiProperty({ description: '기수' })
  @Column({ name: 'generation' })
  generation: number;

  @ApiProperty({ description: '이름' })
  @Column({ name: 'name' })
  name: string;

  @ApiProperty({ description: '이메일' })
  @Column({ name: 'email', unique: true })
  email: string;

  @ApiProperty({ description: '학번' })
  @Column({ name: 'student_id', unique: true })
  studentId: string;
}
