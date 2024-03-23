import { PickType } from '@nestjs/swagger';
import { baseDtoKey } from 'src/entities/base.entity';
import { User } from 'src/entities/user.entity';

export class GetUsersResponseDto extends PickType(User, [
  ...baseDtoKey,
  'email',
  'username',
  'phoneNumber',
  'studentId',
  'badges',
]) {}
