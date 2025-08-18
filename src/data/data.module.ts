import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataService } from './data.service';
import { BatchService } from '../batch/batch.service';
import { Batch } from '../batch/batch.entity';
import { GameData } from './gameData.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Batch, GameData])],
  controllers: [],
  providers: [DataService, BatchService],
})
export class DataModule {}
