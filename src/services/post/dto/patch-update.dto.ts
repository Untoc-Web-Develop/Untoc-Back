import { PickType } from '@nestjs/swagger';
import { Post } from 'src/entities/post.entity';

export class PatchPostRequestDto extends PickType(Post, [
  'title',
  'content',
] as const) {}
