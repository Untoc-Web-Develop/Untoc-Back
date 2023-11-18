export class PostApplySettingRequestDto {
  generation: number;
  openAt: Date;
  closeAt: Date;
  content: string;
}

export class PostApplySettingResponseDto {
  id: string;
}
