import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const baseDtoKey = [
  'id',
  'createdAt',
  'updatedAt',
] as (keyof BaseEntity)[];

export class BaseEntity {
  @ApiProperty({ description: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: '생성일자' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정일자' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
