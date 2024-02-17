import { ApiProperty, PickType } from '@nestjs/swagger';
import { About } from 'src/entities/about.entity';
import { baseDtoKey } from 'src/entities/base.entity';
import { History } from 'src/entities/history.entity';

class AboutDto extends PickType(About, [
  ...baseDtoKey,
  'title',
  'content',
  'order',
]) {}

class HistoryDto extends PickType(History, ['id', 'title']) {
  @ApiProperty({ type: [String] })
  contents: string[];
}

class YearBlockDto {
  @ApiProperty({ example: '2024', description: '년도' })
  year: string;

  @ApiProperty({ type: [HistoryDto] })
  histories: HistoryDto[];
}

export class GetAboutsResponseDto {
  @ApiProperty({ type: [AboutDto] })
  abouts: AboutDto[];

  @ApiProperty({ type: [YearBlockDto] })
  yearBlocks: YearBlockDto[];
}
