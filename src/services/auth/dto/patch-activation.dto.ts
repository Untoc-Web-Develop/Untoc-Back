import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';

export class PatchActivationRequestDto extends PickType(User, [
  'id',
  'activation',
]) {}
