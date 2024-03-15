import { ApiProperty, PickType } from '@nestjs/swagger';
import { baseDtoKey } from 'src/entities/base.entity';
import { Team } from 'src/entities/team.entity';

class TeamListDto extends PickType(Team, [
  ...baseDtoKey,
  'name',
  'descriptionTitle',
  'descriptionContent',
]) {
  @ApiProperty({ description: '팀장' })
  leader: string;

  @ApiProperty({ description: '팀원' })
  member: string[];

  @ApiProperty({ description: '팀 소개 링크' })
  links: string[];
}

export class GetTeamListResponseDto {
  @ApiProperty({ type: [TeamListDto] })
  teams: TeamListDto[];
}
