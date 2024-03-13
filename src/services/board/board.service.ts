import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async createBoard(title: string, discordHook: boolean): Promise<Board> {
    const board = new Board();
    board.title = title;
    board.discordHook = discordHook;

    return this.boardRepository.save(board);
  }

  async updateBoard(
    boardId: string,
    title: string,
    discordHook: boolean,
  ): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });
    board.title = title;
    board.discordHook = discordHook;

    return this.boardRepository.save(board);
  }

  async getBoardList(): Promise<Board[]> {
    return this.boardRepository.find();
  }
}
