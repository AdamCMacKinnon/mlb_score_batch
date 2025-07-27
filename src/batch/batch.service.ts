import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { BatchRepository } from './batch.repository';
import { JobType } from './enum/jobType.enum';
import { format } from 'date-fns';
import { JobStatus } from './enum/jobStatus.enum';
import { DataService } from '../data/data.service';

@Injectable()
export class BatchService {
  constructor(
    private dataService: DataService,
    private schedulerRegistry: SchedulerRegistry,
    @InjectRepository(BatchRepository)
    private batchRepository: BatchRepository,
  ) {}

  // WRITE CRON JOBS HERE
  //   @Cron('*/5 * * * *', {
  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'score_updates',
    timeZone: 'America/New_York',
  })
  async getScoreUpdate() {
    Logger.log('Starting Score Update Batch Job');
    try {
      const jobType = JobType.score_update;
      const date = format(new Date(), 'yyyy-LL-dd');
      const getScores = await this.dataService.getScores(date);
      const getData = this.schedulerRegistry.getCronJob('score_updates');
      getData.start();
      const jobStatus =
        getScores.length <= 0 ? JobStatus.blank : JobStatus.success;
      await this.batchRepository.batchJobData(jobType, jobStatus);
      Logger.log('Job Complete');
    } catch (error) {
      Logger.error('THERE WAS AN ERROR IN BATCH JOB! *** ' + error);
    }
  }
}
