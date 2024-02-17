import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { About } from 'src/entities/about.entity';
import { History } from 'src/entities/history.entity';
import { GetAboutsResponseDto } from 'src/services/about/dto/get-abouts.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private readonly aboutRepository: Repository<About>,

    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async getAbouts(): Promise<GetAboutsResponseDto> {
    const abouts = await this.aboutRepository.find({ order: { order: 'ASC' } });
    const histories = await this.historyRepository.find({
      order: { year: 'DESC' },
    });

    const yearBlocks = histories.reduce((acc, history) => {
      const year = history.year.split('-')[0];
      const yearBlock = acc.find((block) => block.year === year);

      const out_history = {
        id: history.id,
        title: history.title,
        year: history.year,
        contents: history.contents.split('\n'),
      };

      if (yearBlock) {
        yearBlock.histories.push(out_history);
      } else {
        acc.push({
          year,
          histories: [out_history],
        });
      }
      return acc;
    }, []);

    return {
      abouts,
      yearBlocks,
    };
  }
}
