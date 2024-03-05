import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AboutService } from 'src/services/about/about.service';
import { GetAboutsResponseDto } from 'src/services/about/dto/get-abouts.dto';

@Controller('about')
@ApiTags('About')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  @ApiOperation({ summary: '메인페이지 정보 조회' })
  @ApiCreatedResponse({
    description: '메인페이지 정보 조회 성공',
    type: GetAboutsResponseDto,
  })
  async getAbouts(): Promise<GetAboutsResponseDto> {
    return await this.aboutService.getAbouts();
  }
}
