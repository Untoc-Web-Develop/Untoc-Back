export class PostApplyRequestDto {
  name: string;
  studentId: string;
  phoneNumber: string;
  email: string;
  applyValues: { applyQuestion: string; value: string }[];
}
