import { Module } from '@nestjs/common';
import { BatchModule } from './batch/batch.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from './data/data.module';
import { typeOrmConfigAsync } from './config/TypeOrmConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.STAGE}`,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    BatchModule,
    DataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
