import { Module } from '@nestjs/common';
import { BatchModule } from './batch/batch.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from './data/data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.STAGE}`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      migrations: ['dist/migrations*.js'],
      entities: ['dist/**/*.entity.{js,ts}', 'src/**/*.entity.{ts,js}'],
      autoLoadEntities: true,
      migrationsRun: true,
      synchronize: false,
      logging: true,
    }),
    BatchModule,
    DataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
