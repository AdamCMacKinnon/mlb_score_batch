import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchService } from './batch.service';
import { DataService } from '../data/data.service';
import { Batch } from './Entities/batch.entity';
import { GameData } from '../data/Entities/gameData.entity';
import { BatchRepository } from './batch.repository';
import { StuffPlusMetrics } from '../data/Entities/stuffplus.entity';
import { PitcherStats } from '../data/Entities/pitcherStats.entity';
import { SCPitchPercentiles } from '../data/Entities/sc_pitch_percentiles.entity';
import { PitcherName } from '../data/Entities/pitcherName.entity';
import { BatterName } from '../data/Entities/batterName.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      Batch,
      GameData,
      StuffPlusMetrics,
      PitcherStats,
      SCPitchPercentiles,
      PitcherName,
      BatterName,
    ]),
  ],
  providers: [BatchService, DataService, BatchRepository],
})
export class BatchModule {}
