import { About } from 'src/entities/about.entity';
import { BadgeLog } from 'src/entities/badge-log.entity';
import { Badge } from 'src/entities/badge.entity';
import { Board } from 'src/entities/board.entity';
import { File } from 'src/entities/file.entity';
import { History } from 'src/entities/history.entity';
import { Meetup } from 'src/entities/meetup.entity';
import { Post } from 'src/entities/post.entity';
import { Team } from 'src/entities/team.entity';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { Whitelist } from 'src/entities/whitelist.entity';

import { ApplyQuestion } from './apply-question.entity';
import { ApplySetting } from './apply-setting.entity';
import { ApplyValue } from './apply-value.entity';
import { Apply } from './apply.entity';
import { Email } from './email.entity';

export default [
  About,
  Apply,
  ApplyQuestion,
  ApplySetting,
  ApplyValue,
  BadgeLog,
  Badge,
  Board,
  File,
  Meetup,
  Post,
  Team,
  User,
  Vote,
  Whitelist,
  History,
  Email,
];
