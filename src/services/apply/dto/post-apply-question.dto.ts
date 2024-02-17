import { PickType } from '@nestjs/swagger';
import { ApplyQuestion } from 'src/entities/apply-question.entity';

export class PostApplyQuestionResponseDto extends PickType(ApplyQuestion, [
  'id',
]) {}
