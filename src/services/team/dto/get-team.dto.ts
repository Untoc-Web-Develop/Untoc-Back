import { ApiProperty, PickType } from '@nestjs/swagger';
import { baseDtoKey } from 'src/entities/base.entity';
import { Team } from 'src/entities/team.entity';

class GetTeamDto extends PickType(Team, [
  ...baseDtoKey,
  'name',
  'descriptionTitle',
  'descriptionContent',
  'links',
]) {
  leader: string;
  member: string[];
}

export class GetTeamResponseDto {
  @ApiProperty({ type: GetTeamDto })
  team: GetTeamDto;
}
