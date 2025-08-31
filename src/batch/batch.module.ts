import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchService } from './batch.service';
import { DataService } from '../data/data.service';
import { Batch } from './Entities/batch.entity';
import { GameData } from '../data/Entities/gameData.entity';
import { BatchRepository } from './batch.repository';
import { DataRepository } from '../data/data.repository';
import { StuffPlusRepository } from '../data/stuffPlus.repository';
import { StuffPlusMetrics } from '../data/Entities/stuffplus.entity';
import { PitcherStats } from '../data/Entities/pitcherStats.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Batch, GameData, StuffPlusMetrics, PitcherStats]),
  ],
  providers: [
    BatchService,
    DataService,
    BatchRepository,
    DataRepository,
    StuffPlusRepository,
  ],
})
export class BatchModule {}
