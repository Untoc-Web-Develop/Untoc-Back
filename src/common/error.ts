import { HttpException } from '@nestjs/common';

const ERROR = {
  INVALID_CREDENTIALS: new HttpException(
    '이메일 혹은 비밀번호가 틀렸습니다.',
    401,
  ),
  NEED_LOGIN: new HttpException('로그인이 필요합니다.', 401),
  INVALID_TOKEN: new HttpException('유효하지 않은 토큰입니다.', 401),
  EXPIRED_TOKEN: new HttpException('만료된 토큰입니다.', 401),
  UNAUTHORIZED: new HttpException('권한이 없습니다.', 403),
  NOT_FOUND: new HttpException('찾을 수 없습니다.', 404),
  ALREADY_EXISTS: new HttpException('이미 존재하는 정보 입니다.', 409),
  NOT_WHITELISTED: new HttpException('화이트리스트에 없는 정보입니다.', 409),
  UNKNOWN: new HttpException('알 수 없는 오류입니다.', 500),
};

export default ERROR;
