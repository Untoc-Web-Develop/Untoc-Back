import { PickType } from '@nestjs/swagger';
import { baseDtoKey } from 'src/entities/base.entity';
import { Board } from 'src/entities/board.entity';
import { Post } from 'src/entities/post.entity';

class PostDto extends PickType(Post, [...baseDtoKey, 'title', 'content']) {}

export class PostCreateRequestDto extends PostDto {
  board: Board;
}

export class PostCreateResponseDto extends PickType(Post, ['id']) {}
