import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutController } from 'src/controllers/about.controller';
import { About } from 'src/entities/about.entity';
import { History } from 'src/entities/history.entity';
import { AboutService } from 'src/services/about/about.service';

@Module({
  imports: [TypeOrmModule.forFeature([About, History])],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}
