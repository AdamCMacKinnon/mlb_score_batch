import { Repository } from 'typeorm';
import { PitcherName } from './pitcherName.entity';
import { Logger } from '@nestjs/common';

export class PitcherNameRepository extends Repository<PitcherName> {
  async updatePitcherListValues(
    fgId: string,
    mlbAmId: string,
    playerName: string,
  ): Promise<void> {
    try {
      await this.upsert(
        {
          fg_id: fgId,
          xmlbamid: mlbAmId,
          player_name: playerName,
        },
        ['fg_id'],
      );
    } catch (error) {
      Logger.error(`THERE WAS AN ERROR! WRITING PITCHER LIST VALUES ${error}`);
    }
  }
}
