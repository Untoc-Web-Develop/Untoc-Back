import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhitelistController } from 'src/controllers/whitelist.controller';
import { Whitelist } from 'src/entities/whitelist.entity';
import { WhitelistService } from 'src/services/whitelist/whiltelist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Whitelist])],
  controllers: [WhitelistController],
  providers: [WhitelistService],
})
export class WhitelistModule {}
