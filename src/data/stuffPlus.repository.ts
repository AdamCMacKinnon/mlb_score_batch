import { Logger } from '@nestjs/common';
import { StuffPlusMetrics } from './Entities/stuffplus.entity';
import { Repository } from 'typeorm';

export class StuffPlusRepository extends Repository<StuffPlusMetrics> {
  // Writes values to DB table for Stuff Plus
  async writeStuffPlusValues(
    fgId: string,
    mlbAmId: string,
    sp_s_ch: number,
    sp_l_ch: number,
    sp_s_ff: number,
    sp_l_ff: number,
    sp_s_SI: number,
    sp_l_SI: number,
    sp_s_SL: number,
    sp_l_SL: number,
    sp_s_KC: number,
    sp_l_KC: number,
    sp_s_FC: number,
    sp_l_FC: number,
    sp_s_FS: number,
    sp_l_FS: number,
    sp_s_FO: number,
    sp_l_FO: number,
    sp_stuff: number,
    sp_location: number,
    sp_pitching: number,
  ): Promise<void> {
    try {
      const stuffPlus = this.create({
        fg_id: fgId,
        xmlbamid: mlbAmId,
        sp_s_ch: sp_s_ch,
        sp_l_ch: sp_l_ch,
        sp_s_ff: sp_s_ff,
        sp_l_ff: sp_l_ff,
        sp_s_SI: sp_s_SI,
        sp_l_SI: sp_l_SI,
        sp_s_SL: sp_s_SL,
        sp_l_SL: sp_l_SL,
        sp_s_KC: sp_s_KC,
        sp_l_KC: sp_l_KC,
        sp_s_FC: sp_s_FC,
        sp_l_FC: sp_l_FC,
        sp_s_FS: sp_s_FS,
        sp_l_FS: sp_l_FS,
        sp_s_FO: sp_s_FO,
        sp_l_FO: sp_l_FO,
        sp_stuff: sp_stuff,
        sp_location: sp_location,
        sp_pitching: sp_pitching,
      });
      await this.save(stuffPlus);
    } catch (error) {
      Logger.error(`THERE WAS AN ERROR! IN DATA REPO ${error}`);
    }
  }
}
