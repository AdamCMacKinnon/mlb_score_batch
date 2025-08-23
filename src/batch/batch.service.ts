import { Injectable, Logger } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { JobType } from './enum/jobType.enum';
import { format } from 'date-fns';
import { JobStatus } from './enum/jobStatus.enum';
import { DataService } from '../data/data.service';
import { Batch } from './Entities/batch.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BatchService {
  constructor(
    private dataService: DataService,
    private schedulerRegistry: SchedulerRegistry,
    @InjectRepository(Batch)
    private batchRepository: Repository<Batch>,
  ) {}

  /**
   * BATCH SCHEDULE:
   * Every 5 minutes = score_updates
   * Daily, 4AM = fg_pitcher_update
   * Daily, 5AM = fg_batter_update
   * Daily, 6AM = daily_stuff_plus
   */

  @Cron('*/5 * * * *', {
    // @Cron(CronExpression.EVERY_30_SECONDS, {
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

  // @Cron(CronExpression.EVERY_10_SECONDS, {
  @Cron(CronExpression.EVERY_DAY_AT_5AM, {
    name: 'daily_stuff_plus',
    timeZone: 'America/New_York',
  })
  async getDailyStuffPlus() {
    Logger.log('Starting FG Pitcher Job');
    try {
      const jobType = JobType.daily_stuff_plus;
      const getStats = await this.dataService.getDailyStuffPlus();
      const getData = this.schedulerRegistry.getCronJob('daily_stuff_plus');
      getData.start();
      const jobStatus =
        getStats.length <= 0 ? JobStatus.blank : JobStatus.success;
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
