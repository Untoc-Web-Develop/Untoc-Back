import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginAuthGuard } from 'src/services/auth/guard/login.guard';
import { PatchPostRequestDto } from 'src/services/post/dto/patch-update.dto';
import { PostCreateRequestDto } from 'src/services/post/dto/post-create.dto';
import { PostService } from 'src/services/post/post.service';

@Controller('')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/post')
  @ApiOperation({ summary: '게시글 작성' })
  @UseGuards(LoginAuthGuard)
  @ApiBody({
    type: PostCreateRequestDto,
    description: '게시글 작성',
  })
  async createPost(
    @Request() req,
    @Body() createPostRequestDto: PostCreateRequestDto,
  ) {
    const userId = req.user.userId;
    return this.postService.createPost(
      createPostRequestDto.title,
      createPostRequestDto.content,
      userId,
      createPostRequestDto.board,
    );
  }

  @Get('/post/:postId')
  @ApiOperation({ summary: '게시글 조회' })
  @UseGuards(LoginAuthGuard)
  async getPost(@Param('postId') postId: string) {
    return this.postService.getPostById(postId);
  }

  @Patch('/post/:postId')
  @ApiOperation({ summary: '게시글 수정' })
  @UseGuards(LoginAuthGuard)
  async updatePost(
    @Param('postId') postId: string,
    @Body() patchPostRequestDto: PatchPostRequestDto,
  ) {
    return this.postService.updatePost(
      postId,
      patchPostRequestDto.title,
      patchPostRequestDto.content,
    );
  }

  @Delete('/post/:postId')
  @ApiOperation({ summary: '게시글 삭제' })
  @UseGuards(LoginAuthGuard)
  async deletePost(@Param('postId') postId: string) {
    return this.postService.deletePost(postId);
  }

  @Post('/post/discord/:postId')
  @ApiOperation({ summary: '게시글 Discord 수동 알림' })
  @UseGuards(LoginAuthGuard)
  async sendMsgDiscord(@Param('postId') postId: string) {
    return this.postService.sendMsgDiscordByPostId(postId);
  }

  @Get('/:board')
  @ApiOperation({ summary: '특정 게시판 게시글 목록' })
  @UseGuards(LoginAuthGuard)
  async getPostListByBoard(@Param('board') boardName?: string) {
    return this.postService.getPostsByAuthorAndBoard(undefined, boardName);
  }

  @Get('/')
  @ApiOperation({ summary: '특정 작성자 게시글 목록' })
  @UseGuards(LoginAuthGuard)
  async getPostListByAuthor(@Query('author') authorId?: string) {
    return this.postService.getPostsByAuthorAndBoard(authorId, undefined);
  }
}
