class GetApplyDto {
  id: string;
  name: string;
  studentId: string;
  phoneNumber: string;
  email: string;
  applyValues: { applyQuestion: string; value: string }[];
}

export class GetApplyResponseDto extends Array<GetApplyDto> {}
