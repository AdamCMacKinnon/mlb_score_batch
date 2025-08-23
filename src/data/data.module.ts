import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataService } from './data.service';
import { BatchService } from '../batch/batch.service';
import { Batch } from '../batch/Entities/batch.entity';
import { GameData } from './Entities/gameData.entity';
import { StuffPlusMetrics } from './Entities/stuffplus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Batch, GameData, StuffPlusMetrics])],
  controllers: [],
  providers: [DataService, BatchService],
})
export class DataModule {}
