import { ApiProperty, PickType } from '@nestjs/swagger';
import { Apply } from 'src/entities/apply.entity';
import { baseDtoKey } from 'src/entities/base.entity';

class GetApplyDto extends PickType(Apply, [
  ...baseDtoKey,
  'name',
  'studentId',
  'phoneNumber',
  'email',
]) {
  applyValues: {
    applyQuestion: string;
    value: string;
  }[];
}

export class GetApplyResponseDto {
  @ApiProperty({ type: [GetApplyDto] })
  applies: GetApplyDto[];
}
