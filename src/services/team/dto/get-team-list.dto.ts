import { ApiProperty, PickType } from '@nestjs/swagger';
import { baseDtoKey } from 'src/entities/base.entity';
import { Team } from 'src/entities/team.entity';

class TeamListDto extends PickType(Team, [
  ...baseDtoKey,
  'name',
  'descriptionTitle',
  'descriptionContent',
]) {
  member: string[];
}

export class GetTeamListResponseDto {
  teams: TeamListDto[];
}
