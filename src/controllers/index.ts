import { AboutController } from 'src/controllers/about.controller';
import { ApplyController } from 'src/controllers/apply.controller';
import { AuthController } from 'src/controllers/auth.controller';
import { BoardController } from 'src/controllers/board.controller';
import { EmailController } from 'src/controllers/email.controller';
import { PostController } from 'src/controllers/post.controller';
import { WhitelistController } from 'src/controllers/whitelist.controller';

export default [
  AuthController,
  AboutController,
  ApplyController,
  WhitelistController,
  EmailController,
  BoardController,
  PostController,
];
