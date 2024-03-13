import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AboutService } from 'src/services/about/about.service';
import { ApplyService } from 'src/services/apply/apply.service';
import { AuthService } from 'src/services/auth/auth.service';
import { UserService } from 'src/services/user/user.service';
import { WhitelistService } from 'src/services/whitelist/whitelist.service';

import { TeamService } from './team/team.service';

export default [
  AboutService,
  ApplyService,
  UserService,
  WhitelistService,
  ConfigService,
  JwtService,
  AuthService,
  TeamService,
];
