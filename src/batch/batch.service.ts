import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { JobType } from './enum/jobType.enum';
import { format } from 'date-fns';
import { JobStatus } from './enum/jobStatus.enum';
import { DataService } from '../data/data.service';
import { Batch } from './batch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BatchService {
  constructor(
    private dataService: DataService,
    private schedulerRegistry: SchedulerRegistry,
    @InjectRepository(Batch)
    private batchRepository: Repository<Batch>,
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
      await this.batchJobData(jobType, jobStatus);
      Logger.log('Job Complete');
    } catch (error) {
      Logger.error('THERE WAS AN ERROR IN BATCH JOB! *** ' + error);
    }
  }

  async batchJobData(jobType: JobType, jobStatus: JobStatus) {
    try {
      const batch = this.batchRepository.create({
        job_type: jobType,
        job_status: jobStatus,
      });
      await this.batchRepository.save(batch);
      Logger.log(`${jobType} Completed, Saving Status ${jobStatus} to table`);
    } catch (error) {
      Logger.error(`ERROR INSERTING BATCH DATA: ${error}`);
    }
  }
}
