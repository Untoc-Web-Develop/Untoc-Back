import { Module } from '@nestjs/common';
import modules from 'src/modules';

@Module({
  imports: [...modules],
})
export class AppModule {}
