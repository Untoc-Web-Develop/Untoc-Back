import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAuthGuard } from 'src/services/auth/guard/login.guard';
import { BoardService } from 'src/services/board/board.service';
import { BoardCreateRequestDto } from 'src/services/board/dto/post-create.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly userService: UserService,
  ) {}

  @Post('/create')
  @ApiOperation({ summary: '게시판 생성' })
  @UseGuards(LoginAuthGuard)
  @ApiBody({
    type: BoardCreateRequestDto,
    description: '게시판 생성',
  })
  async createBoard(
    @Request() req,
    @Body() boardCreateRequestDto: BoardCreateRequestDto,
  ) {
    const userId = req.user.userId;
    if (await this.userService.checkBadgeForAuth(userId, 'admin'))
      return this.boardService.createBoard(
        boardCreateRequestDto.title,
        boardCreateRequestDto.discordHook,
      );
  }

  @Patch('/update')
  @ApiOperation({ summary: '게시판 수정' })
  @UseGuards(LoginAuthGuard)
  async updateBoard(
    @Request() req,
    @Body() boardCreateRequestDto: BoardCreateRequestDto,
  ) {
    const userId = req.user.userId;
    if (await this.userService.checkBadgeForAuth(userId, 'admin'))
      return this.boardService.updateBoard(
        boardCreateRequestDto.id,
        boardCreateRequestDto.title,
        boardCreateRequestDto.discordHook,
      );
  }

  @Get('/list')
  @ApiOperation({ summary: '게시판 목록' })
  async getBoardList() {
    return this.boardService.getBoardList();
  }
}
