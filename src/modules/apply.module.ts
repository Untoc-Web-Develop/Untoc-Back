import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplyController } from 'src/controllers/apply.controller';
import { ApplyQuestion } from 'src/entities/apply-question.entity';
import { ApplySetting } from 'src/entities/apply-setting.entity';
import { ApplyValue } from 'src/entities/apply-value.entity';
import { Apply } from 'src/entities/apply.entity';
import { ApplyService } from 'src/services/apply/apply.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Apply, ApplyQuestion, ApplySetting, ApplyValue]),
  ],
  controllers: [ApplyController],
  providers: [ApplyService],
})
export class ApplyModule {}
