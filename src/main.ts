import { NestFactory } from '@nestjs/core';
import { setupSwagger } from 'src/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  setupSwagger(app);

  await app.listen(3001);
}
bootstrap();
