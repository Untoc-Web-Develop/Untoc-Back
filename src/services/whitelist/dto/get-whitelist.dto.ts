import { BaseDto } from 'src/common/dto/base.dto';

class WhitelistDto extends BaseDto {
  phoneNumber: string;
  email: string;
  studentId: string;
}

export class GetWhiteListResponseDto extends Array<WhitelistDto> {}
