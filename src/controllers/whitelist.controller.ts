import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LoginAuthGuard } from 'src/auth/guard/login.guard';
import { UserService } from 'src/services/user/user.service';
import { GetWhiteListResponseDto } from 'src/services/whitelist/dto/get-whitelist.dto';
import {
  PostWhitelistRequestDto,
  PostWhitelistResponseDto,
} from 'src/services/whitelist/dto/post-whitelist.dto';
import { WhitelistService } from 'src/services/whitelist/whitelist.service';

@Controller('whitelist')
@ApiTags('Whitelist')
export class WhitelistController {
  constructor(
    private readonly whitelistService: WhitelistService,
    private readonly userService: UserService,
  ) {}

  @Get('/')
  @UseGuards(LoginAuthGuard)
  @ApiOperation({
    summary: 'Get Whitelist',
    description: 'Get Whitelist',
  })
  @ApiCreatedResponse({
    description: 'Whitelist list',
    type: GetWhiteListResponseDto,
  })
  async findAll(@Request() req): Promise<GetWhiteListResponseDto> {
    const userId = req.user.userId;
    if (await this.userService.checkBadgeForAuth(userId, 'admin')) {
      return await this.whitelistService.findAll();
    }
  }

  @Post('/')
  @UseGuards(LoginAuthGuard)
  @ApiOperation({
    summary: 'Create Whitelist',
    description: 'Create Whitelist',
  })
  @ApiCreatedResponse({
    description: 'Whitelist created',
    type: PostWhitelistResponseDto,
  })
  async create(
    @Request() req,
    @Body() body: PostWhitelistRequestDto,
  ): Promise<PostWhitelistResponseDto> {
    const userId = req.user.userId;
    if (await this.userService.checkBadgeForAuth(userId, 'admin')) {
      return await this.whitelistService.create(body);
    }
  }

  @Delete('/:id')
  @UseGuards(LoginAuthGuard)
  @ApiParam({ name: 'id', description: 'Whitelist id' })
  @ApiOperation({
    summary: 'Delete Whitelist',
    description: 'Delete Whitelist',
  })
  async delete(@Request() req, @Param('id') id: string): Promise<void> {
    const userId = req.user.userId;
    if (await this.userService.checkBadgeForAuth(userId, 'admin')) {
      await this.whitelistService.delete(id);
    }
  }
}
