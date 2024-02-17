class GetApplyQuestionDto {
  id: string;
  question: string;
  description: string;
}

export class GetApplyQuestionResponseDto extends Array<GetApplyQuestionDto> {}
