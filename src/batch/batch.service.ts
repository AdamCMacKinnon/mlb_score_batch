import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { BatchRepository } from './batch.repository';

@Injectable()
export class BatchService {
  constructor(
    private scheduleRegistry: SchedulerRegistry,
    @InjectRepository(BatchRepository)
    private batchRepository: BatchRepository,
  ) {}

  // WRITE CRON JOBS HERE
}
