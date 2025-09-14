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
import { PitcherNameRepository } from '../data/Entities/pitcherName.repository';

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
    ]),
  ],
  providers: [
    BatchService,
    DataService,
    BatchRepository,
    PitcherNameRepository,
  ],
})
export class BatchModule {}
