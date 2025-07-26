import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchRepository } from './batch.repository';

@Module({
  imports: [ScheduleModule.forRoot(), BatchRepository],
})
export class BatchModule {}
