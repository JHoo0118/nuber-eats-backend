import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Restaurant } from './restaurants/entities/restaurant.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      // 앱 어디서나 Config Module에 접근할 수 있도록 함
      isGlobal: true,
      // package.json의 ENV=dev와 NODE_ENV를 매치
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      // production 환경일 때는 ConfigModule이 환경변수 파일을 무시
      ignoreEnvFile: process.env.NODE_ENV === 'prod' ? true : false,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // TypeORM이 데이터베이스에 연결할 때, 모듈의 현재 상태로 마이그레이션
      // production mode일 때는 false
      synchronize: process.env.NODE_ENV !== 'prod',
      // 데이터베이스에서 무슨일이 일어나는지 콘솔에 표시
      logging: process.env.NODE_ENV !== 'prod',
      entities: [Restaurant],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    RestaurantsModule,
  ],
})
export class AppModule {}
