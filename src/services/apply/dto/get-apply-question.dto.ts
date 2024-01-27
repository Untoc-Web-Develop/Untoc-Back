class GetApplyQuestionDto {
  id: string;
  question: string;
}

export class GetApplyQuestionResponseDto extends Array<GetApplyQuestionDto> {}
