import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchRepository } from './batch.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchService } from './batch.service';
import { DataService } from '../data/data.service';
import { DataRepository } from '../data/data.repository';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([BatchRepository, DataRepository]),
  ],
  providers: [BatchService, DataService],
})
export class BatchModule {}
