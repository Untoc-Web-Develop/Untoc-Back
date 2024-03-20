import { PickType } from '@nestjs/swagger';
import { baseDtoKey } from 'src/entities/base.entity';
import { Post } from 'src/entities/post.entity';

class PostDto extends PickType(Post, [
  ...baseDtoKey,
  'id',
  'title',
  'content',
]) {}

export class PostReadResponseDto extends PostDto {
  'username': string;
}
