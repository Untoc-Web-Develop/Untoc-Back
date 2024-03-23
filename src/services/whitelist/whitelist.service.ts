import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ERROR from 'src/common/error';
import { Whitelist } from 'src/entities/whitelist.entity';
import { GetWhiteListResponseDto } from 'src/services/whitelist/dto/get-whitelist.dto';
import {
  PostWhitelistRequestDto,
  PostWhitelistResponseDto,
} from 'src/services/whitelist/dto/post-whitelist.dto';
import { Repository } from 'typeorm';

@Injectable()
export class WhitelistService {
  constructor(
    @InjectRepository(Whitelist)
    private readonly whitelistRepository: Repository<Whitelist>,
  ) {}

  async findAll(): Promise<GetWhiteListResponseDto> {
    const whitelists: Array<Whitelist> = await this.whitelistRepository.find({
      order: { name: 'ASC' },
    });

    return {
      whitelists: whitelists.map((whitelist) => ({
        id: whitelist.id,
        name: whitelist.name,
        email: whitelist.email,
        studentId: whitelist.studentId,
        generation: whitelist.generation,
        createdAt: whitelist.createdAt,
        updatedAt: whitelist.updatedAt,
      })),
    };
  }

  async create(
    newWhitelist: PostWhitelistRequestDto,
  ): Promise<PostWhitelistResponseDto> {
    const isExist = await this.whitelistRepository.findOne({
      where: { email: newWhitelist.email, studentId: newWhitelist.studentId },
    });
    if (isExist) throw ERROR.ALREADY_EXISTS;

    const Whitelist = await this.whitelistRepository.save(newWhitelist);

    return {
      id: Whitelist.id,
    };
  }

  async delete(id: string): Promise<void> {
    await this.whitelistRepository.delete({ id: id });
  }
}
