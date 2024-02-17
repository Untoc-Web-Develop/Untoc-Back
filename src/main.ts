import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { setupSwagger } from 'src/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());

  app.enableCors({
    origin: configService.get('CORS_ORIGIN').split(','),
    credentials: true,
  });

  setupSwagger(app);

  await app.listen(configService.get('PORT'));
}
bootstrap();
