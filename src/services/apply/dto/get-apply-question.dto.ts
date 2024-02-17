import { ApiProperty, PickType } from '@nestjs/swagger';
import { ApplyQuestion } from 'src/entities/apply-question.entity';

class GetApplyQuestionDto extends PickType(ApplyQuestion, [
  'id',
  'question',
  'description',
]) {}

export class GetApplyQuestionResponseDto {
  @ApiProperty({ type: [GetApplyQuestionDto] })
  applyQuestions: GetApplyQuestionDto[];
}
