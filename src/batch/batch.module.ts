import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchService } from './batch.service';
import { DataService } from '../data/data.service';
import { Batch } from './batch.entity';
import { GameData } from '../data/gameData.entity';
import { BatchRepository } from './batch.repository';
import { DataRepository } from '../data/data.repository';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Batch, GameData]),
  ],
  providers: [BatchService, DataService, BatchRepository, DataRepository],
})
export class BatchModule {}
