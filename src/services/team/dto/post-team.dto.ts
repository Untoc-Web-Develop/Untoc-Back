import { ApiProperty, PickType } from '@nestjs/swagger';
import { Team } from 'src/entities/team.entity';

class PostTeamDto extends PickType(Team, [
  'name',
  'descriptionTitle',
  'descriptionContent',
]) {
  @ApiProperty({ description: '팀원 id 목록' })
  member: string[];

  @ApiProperty({ description: '팀 소개 링크' })
  links: string[];
}

export class PostTeamRequestDto {
  @ApiProperty({ type: PostTeamDto })
  team: PostTeamDto;
}

export class PostTeamResponseDto {
  @ApiProperty({ description: '생성된 팀의 id' })
  id: string;
}
