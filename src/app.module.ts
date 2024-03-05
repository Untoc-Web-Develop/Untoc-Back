import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import controllers from 'src/controllers';
import entities from 'src/entities';
import services from 'src/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: entities,
      synchronize: process?.env?.MODE === 'DEV' ? true : false,
    }),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: controllers,
  providers: services,
})
export class AppModule {}
