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
   * Daily, 5AM = pitcher_name_update
   * Daily, 8AM = pitcher_stats_update
   * Weekly, 6AM Friday = stuff_plus_update
   */

  // runs every 5 minutes, daily.
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

  // runs every Friday at 6AM
  @Cron('0 6 * * 5', {
    name: 'stuff_plus_update',
    timeZone: 'America/New_York',
  })
  async getDailyStuffPlus() {
    Logger.log('Starting FG Pitcher Job');
    try {
      const jobType = JobType.stuff_plus_update;
      const getStats = await this.dataService.getDailyStuffPlus();
      const getData = this.schedulerRegistry.getCronJob('stuff_plus_update');
      getData.start();
      const jobStatus =
        getStats.length <= 0 ? JobStatus.blank : JobStatus.success;
      await this.batchJobData(jobType, jobStatus);
      Logger.log('Job Complete');
    } catch (error) {
      Logger.error('THERE WAS AN ERROR IN BATCH JOB! *** ' + error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM, {
    name: 'pitcher_stats_update',
    timeZone: 'America/New_York',
  })
  async getPitcherStats() {
    Logger.log('Starting Daily Stuff Plus Job');
    try {
      const jobType = JobType.pitcher_stats_update;
      const getStats = await this.dataService.getDailyPitcherStats();
      const getData = this.schedulerRegistry.getCronJob('pitcher_stats_update');
      getData.start();
      const jobStatus =
        getStats.length <= 0 ? JobStatus.blank : JobStatus.success;
      await this.batchJobData(jobType, jobStatus);
      Logger.log('Job Complete');
    } catch (error) {
      Logger.error('THERE WAS AN ERROR IN BATCH JOB! *** ' + error);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_5AM, {
    // @Cron('0 */2 * * * *', {
    name: 'pitcher_list_update',
    timeZone: 'America/New_York',
  })
  async getPitcherList() {
    Logger.log('Starting Daily Pitcher List Job');
    try {
      const jobType = JobType.pitcher_list_update;
      await this.dataService.updatePitcherList();
      const getData = this.schedulerRegistry.getCronJob('pitcher_list_update');
      getData.start();
      const jobStatus = JobStatus.success;
      await this.batchJobData(jobType, jobStatus);
      Logger.log('Job Complete');
    } catch (error) {
      Logger.error(
        `THERE WAS AN ERROR IN BATCH JOB! ${JobType.pitcher_list_update} *** ${error}`,
      );
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_7AM, {
    // @Cron(CronExpression.EVERY_MINUTE, {
    name: 'batter_list_update',
    timeZone: 'America/New_York',
  })
  async getBatterList() {
    Logger.log('Starting Daily Batter List Job');
    try {
      const jobType = JobType.batter_list_update;
      await this.dataService.updateBatterList();
      const getData = this.schedulerRegistry.getCronJob('batter_list_update');
      getData.start();
      const jobStatus = JobStatus.success;
      await this.batchJobData(jobType, jobStatus);
      Logger.log('Job Complete');
    } catch (error) {
      Logger.error(
        `THERE WAS AN ERROR IN BATCH JOB! ${JobType.batter_list_update} *** ${error}`,
      );
    }
  }

  // runs after every batch job
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
