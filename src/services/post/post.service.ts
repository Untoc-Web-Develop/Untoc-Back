import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Webhook } from 'discord-webhook-node';
import { Board } from 'src/entities/board.entity';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { PostReadResponseDto } from 'src/services/Post/dto/get-read.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly configService: ConfigService,
  ) {}

  async createPost(
    title: string,
    content: string,
    author: User,
    board: Board,
  ): Promise<Post> {
    const post = new Post();
    post.title = title;
    post.content = content;
    post.author = author;
    post.board = board;

    if (board.discordHook) {
      await this.sendMsgDiscord(title, content, board.title);
    }
    return this.postRepository.save(post);
  }

  async getPostsByAuthorAndBoard(
    authorId?: string,
    boardName?: string,
  ): Promise<PostReadResponseDto[]> {
    const queryConditions: any = { relations: ['author', 'board'] };
    queryConditions.where = {};

    if (authorId) {
      queryConditions.where.author = { id: authorId };
    }
    if (boardName) {
      queryConditions.where.board = { title: boardName };
    }

    const posts = await this.postRepository.find(queryConditions);

    return posts.map((post) => ({
      id: post.id,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      title: post.title,
      content: post.content,
      username: post.author.username,
    }));
  }

  async updatePost(
    postId: string,
    title: string,
    content: string,
  ): Promise<PostReadResponseDto> {
    const rawPost = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author', 'board'],
    });
    rawPost.title = title;
    rawPost.content = content;
    const updatedPost = await this.postRepository.save(rawPost);

    return {
      id: updatedPost.id,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
      title: updatedPost.title,
      content: updatedPost.content,
      username: updatedPost.author.username,
    };
  }

  async getPostById(postId: string): Promise<PostReadResponseDto> {
    const rawPost = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author', 'board'],
    });

    return {
      id: rawPost.id,
      createdAt: rawPost.createdAt,
      updatedAt: rawPost.updatedAt,
      title: rawPost.title,
      content: rawPost.content,
      username: rawPost.author.username,
    };
  }

  async sendMsgDiscordByPostId(postId: string) {
    const rawPost = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['author', 'board'],
    });
    await this.sendMsgDiscord(
      rawPost.title,
      rawPost.content,
      rawPost.board.title,
    );
  }

  async sendMsgDiscord(title: string, content: string, boardName: string) {
    const hook = new Webhook(this.configService.get('DISCORD_WEBHOOK_URL'));
    try {
      await hook
        .send(
          '게시판 : ' + boardName + '\n제목 : ' + title + '\n내용 : ' + content,
        )
        .then(() => console.log('Sent a message to Discord'))
        .catch((error) =>
          console.error('Error while sending a message to Discord', error),
        );
    } catch (error) {
      console.error('Error while sending a message to Discord', error);
    }
  }

  async deletePost(postId: string) {
    return this.postRepository.delete(postId);
  }
}
