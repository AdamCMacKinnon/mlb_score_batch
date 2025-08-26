import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASS'),
    database: configService.get<string>('DB_NAME'),
    extra: { family: 4 },
    migrations: ['dist/migrations/*.js'],
    entities: ['dist/**/**/*.entity.js'],
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: true,
    logging: true,
  }),
};
