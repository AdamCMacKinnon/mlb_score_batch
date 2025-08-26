import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    url: configService.get<string>('DB_URL'),
    ssl: process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : false,
    migrations: ['dist/migrations/*.js'],
    entities: ['dist/**/**/*.entity.js'],
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: true,
    logging: true,
  }),
};
