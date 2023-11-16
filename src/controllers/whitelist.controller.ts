import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetWhiteListResponseDto } from 'src/services/whitelist/dto/get-whitelist.dto';
import {
  PostWhitelistRequestDto,
  PostWhitelistResponseDto,
} from 'src/services/whitelist/dto/post-whitelist.dto';
import { WhitelistService } from 'src/services/whitelist/whiltelist.service';

@Controller('whitelist')
export class WhitelistController {
  constructor(private readonly whitelistService: WhitelistService) {}

  @Get('/')
  async findAll(): Promise<GetWhiteListResponseDto> {
    return await this.whitelistService.findAll();
  }

  @Post('/')
  async create(
    @Body() request: PostWhitelistRequestDto,
  ): Promise<PostWhitelistResponseDto> {
    return await this.whitelistService.create(request);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.whitelistService.delete(id);
  }
}
