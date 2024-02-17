import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetWhiteListResponseDto } from 'src/services/whitelist/dto/get-whitelist.dto';
import {
  PostWhitelistRequestDto,
  PostWhitelistResponseDto,
} from 'src/services/whitelist/dto/post-whitelist.dto';
import { WhitelistService } from 'src/services/whitelist/whitelist.service';

@Controller('whitelist')
@ApiTags('Whitelist')
export class WhitelistController {
  constructor(private readonly whitelistService: WhitelistService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Get Whitelist',
    description: 'Get Whitelist',
  })
  @ApiCreatedResponse({
    description: 'Whitelist list',
    type: GetWhiteListResponseDto,
  })
  async findAll(): Promise<GetWhiteListResponseDto> {
    return await this.whitelistService.findAll();
  }

  @Post('/')
  @ApiOperation({
    summary: 'Create Whitelist',
    description: 'Create Whitelist',
  })
  @ApiCreatedResponse({
    description: 'Whitelist created',
    type: PostWhitelistResponseDto,
  })
  async create(
    @Body() request: PostWhitelistRequestDto,
  ): Promise<PostWhitelistResponseDto> {
    return await this.whitelistService.create(request);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'Whitelist id' })
  @ApiOperation({
    summary: 'Delete Whitelist',
    description: 'Delete Whitelist',
  })
  async delete(@Param('id') id: string): Promise<void> {
    await this.whitelistService.delete(id);
  }
}
