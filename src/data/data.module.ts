import { Module } from '@nestjs/common';
import { BatchRepository } from '../batch/batch.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataService } from './data.service';
import { DataRepository } from './data.repository';
import { BatchService } from '../batch/batch.service';

@Module({
  imports: [TypeOrmModule.forFeature([BatchRepository, DataRepository])],
  controllers: [],
  providers: [DataService, BatchService],
})
export class DataModule {}
