import { Repository } from 'typeorm';
import { Batch } from './batch.entity';
import { JobType } from './enum/jobType.enum';
import { JobStatus } from './enum/jobStatus.enum';
import { Logger } from '@nestjs/common';

export class BatchRepository extends Repository<Batch> {
  async batchJobData(jobType: JobType, jobStatus: JobStatus) {
    try {
      const batch = this.create({
        job_type: jobType,
        job_status: jobStatus,
      });
      await this.save(batch);
      Logger.log(`${jobType} Completed, Saving Status ${jobStatus} to table`);
    } catch (error) {
      Logger.error(`ERROR INSERTING BATCH DATA: ${error}`);
    }
  }
}
