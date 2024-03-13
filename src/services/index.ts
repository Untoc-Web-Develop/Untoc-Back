import { Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AboutService } from 'src/services/about/about.service';
import { ApplyService } from 'src/services/apply/apply.service';
import { AuthService } from 'src/services/auth/auth.service';
import { BoardService } from 'src/services/board/board.service';
import { EmailService } from 'src/services/email/email.service';
import { PostService } from 'src/services/post/post.service';
import { UserService } from 'src/services/user/user.service';
import { WhitelistService } from 'src/services/whitelist/whitelist.service';

export default [
  AboutService,
  ApplyService,
  UserService,
  WhitelistService,
  ConfigService,
  JwtService,
  AuthService,
  EmailService,
  BoardService,
  PostService,
];
