import { PickType } from '@nestjs/swagger';
import { Apply } from 'src/entities/apply.entity';

export class PostApplyRequestDto extends PickType(Apply, [
  'name',
  'studentId',
  'phoneNumber',
  'email',
  'applyValues',
]) {}
