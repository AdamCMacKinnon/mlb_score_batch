import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  baseUrl,
  currentDayEndpoint,
  fangraphsBaseUrl,
  stuffPlusEndpoint,
} from '../utils/globals';
import { JobStatus } from '../batch/enum/jobStatus.enum';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Batch } from '../batch/Entities/batch.entity';
import { GameData } from './Entities/gameData.entity';
import { StuffPlusMetrics } from './Entities/stuffplus.entity';
import { PitcherStats } from './Entities/pitcherStats.entity';
import { PitcherName } from './Entities/pitcherName.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Batch)
    private batchRepository: Repository<Batch>,
    @InjectRepository(GameData)
    private dataRepository: Repository<GameData>,
    @InjectRepository(StuffPlusMetrics)
    private stuffPlusRepository: Repository<StuffPlusMetrics>,
    @InjectRepository(PitcherStats)
    private pitcherStatsRepository: Repository<PitcherStats>,
    @InjectRepository(PitcherName)
    private pitcherNameRepository: Repository<PitcherName>,
  ) {}

  // Method gets scores and run differentials per game

  async getScores(date: any): Promise<string> {
    const url = `${baseUrl}/${currentDayEndpoint}&startDate=${date}&endDate=${date}`;
    try {
      const response: any = await axios.get(url);
      const totalGames = response.data.totalGames;

      if (!totalGames) {
        Logger.warn('There are No Games today!');
        const jobStatus = JobStatus.blank;
        return jobStatus;
      } else {
        const data = response.data.dates[0].games;
        for (let x = 0; x < totalGames; x++) {
          const gamePk = data[x].gamePk;
          const homeTeam = data[x].teams.home.team.name;
          const homeScore = data[x].teams.home.score;
          const homeDiff = data[x].teams.home.score - data[x].teams.away.score;
          const awayTeam = data[x].teams.away.team.name;
          const awayScore = data[x].teams.away.score;
          const awayDiff = data[x].teams.away.score - data[x].teams.home.score;
          const gameCode = data[x].status.statusCode;
          Logger.log(`Game ${gamePk} is in Status: ${gameCode}`);
          await this.dailyResults(
            date,
            gamePk,
            homeTeam,
            homeScore,
            homeDiff,
            awayTeam,
            awayScore,
            awayDiff,
            gameCode,
          );
        }
        return data;
      }
    } catch (error) {
      Logger.error(`THERE WAS AN ERROR! IN DATA SERVICE: ${error}`);
    }
  }

  async dailyResults(
    date: string,
    gamePk: number,
    homeTeam: string,
    homeScore: number,
    homeDiff: number,
    awayTeam: string,
    awayScore: number,
    awayDiff: number,
    gameCode: string,
  ): Promise<void> {
    try {
      const game = this.dataRepository.create({
        game_date: date,
        game_pk: gamePk,
        home_team: homeTeam,
        home_score: homeScore || 0,
        home_diff: homeDiff || 0,
        away_team: awayTeam,
        away_score: awayScore || 0,
        away_diff: awayDiff || 0,
        game_code: gameCode,
      });
      await this.dataRepository.save(game);
    } catch (error) {
      Logger.error(`THERE WAS AN ERROR! IN DATA REPO ${error}`);
    }
  }

  async updatePitcherList(): Promise<any> {
    const url = `${fangraphsBaseUrl}/${stuffPlusEndpoint}`;
    try {
      const response: any = await axios.get(url);
      const data = response.data.data;
      for (let i = 0; i < data.length; i++) {
        const fgId = data[i].playerid;
        const mlbAmId = data[i].xMLBAMID;
        const playerName = data[i].Name;
        Logger.log(`Adding Pitcher to List: ${fgId} -- ${playerName}`);
        await this.updatePitcherListValues(fgId, mlbAmId, playerName);
      }
    } catch (error) {
      Logger.error(`THERE WAS AN ERROR! WHILE UPDATING PITCHER LIST: ${error}`);
    }
  }

  async updatePitcherListValues(
    fgId: string,
    mlbAmId: string,
    playerName: string,
  ): Promise<void> {
    try {
      await this.pitcherNameRepository.upsert(
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

  async getDailyStuffPlus(): Promise<any> {
    const url = `${fangraphsBaseUrl}/${stuffPlusEndpoint}`;
    try {
      const response: any = await axios.get(url);
      const data = response.data.data;
      if (data.length < 1) {
        Logger.warn('There are No Pitcher Stats today!');
        return JobStatus.blank;
      } else {
        for (let i = 0; i < data.length; i++) {
          const fgId = data[i].playerid;
          const mlbAmId = data[i].xMLBAMID;
          const sp_s_ch = Math.ceil(data[i].sp_s_CH) || null;
          const sp_l_ch = Math.ceil(data[i].sp_l_CH) || null;
          const sp_s_ff = Math.ceil(data[i].sp_s_FF) || null;
          const sp_l_ff = Math.ceil(data[i].sp_l_FF) || null;
          const sp_s_SI = Math.ceil(data[i].sp_s_SI) || null;
          const sp_l_SI = Math.ceil(data[i].sp_l_SI) || null;
          const sp_s_SL = Math.ceil(data[i].sp_s_SL) || null;
          const sp_l_SL = Math.ceil(data[i].sp_l_SL) || null;
          const sp_s_KC = Math.ceil(data[i].sp_s_KC) || null;
          const sp_l_KC = Math.ceil(data[i].sp_l_KC) || null;
          const sp_s_FC = Math.ceil(data[i].sp_s_FC) || null;
          const sp_l_FC = Math.ceil(data[i].sp_l_FC) || null;
          const sp_s_FS = Math.ceil(data[i].sp_s_FS) || null;
          const sp_l_FS = Math.ceil(data[i].sp_l_FS) || null;
          const sp_s_FO = Math.ceil(data[i].sp_s_FO) || null;
          const sp_l_FO = Math.ceil(data[i].sp_l_FO) || null;
          const sp_stuff = Math.ceil(data[i].sp_stuff) || null;
          const sp_location = Math.ceil(data[i].sp_location) || null;
          const sp_pitching = Math.ceil(data[i].sp_pitching) || null;
          Logger.log(`Writing Stuff Plus for FGID: ${fgId}`);
          await this.writeStuffPlusValues(
            fgId,
            mlbAmId,
            sp_s_ch,
            sp_l_ch,
            sp_s_ff,
            sp_l_ff,
            sp_s_SI,
            sp_l_SI,
            sp_s_SL,
            sp_l_SL,
            sp_s_KC,
            sp_l_KC,
            sp_s_FC,
            sp_l_FC,
            sp_s_FS,
            sp_l_FS,
            sp_s_FO,
            sp_l_FO,
            sp_stuff,
            sp_location,
            sp_pitching,
          );
        }

        return response;
      }
    } catch (error) {
      Logger.error(`THERE WAS AN ERROR! IN DATA SERVICE: ${error}`);
    }
  }

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
      await this.stuffPlusRepository.upsert(
        {
          fg_id: fgId,
          xmlbamid: mlbAmId,
          sp_s_ch,
          sp_l_ch,
          sp_s_ff,
          sp_l_ff,
          sp_s_SI,
          sp_l_SI,
          sp_s_SL,
          sp_l_SL,
          sp_s_KC,
          sp_l_KC,
          sp_s_FC,
          sp_l_FC,
          sp_s_FS,
          sp_l_FS,
          sp_s_FO,
          sp_l_FO,
          sp_stuff,
          sp_location,
          sp_pitching,
        },
        ['fg_id'],
      );
    } catch (error) {
      Logger.error(`THERE WAS AN ERROR! IN DATA REPO ${error}`);
    }
  }

  // Gets daily pitcher stats
  async getDailyPitcherStats(): Promise<any> {
    const url = `${fangraphsBaseUrl}/${stuffPlusEndpoint}`;
    try {
      const response: any = await axios.get(url);
      const data = response.data.data;
      if (data.length < 1) {
        Logger.warn('There are No Pitcher Stats today!');
        return JobStatus.blank;
      } else {
        for (let i = 0; i < data.length; i++) {
          const fgId = data[i].playerid;
          const mlbAmId = data[i].xMLBAMID;

          const wins = data[i].W ?? null;
          const loss = data[i].L ?? null;
          const sv = data[i].SV ?? null;
          const games = data[i].G ?? null;
          const games_started = data[i].GS ?? null;
          const innings_pitched = data[i].IP ?? null;

          const k_per_9 = data[i]['K/9'] ?? null;
          const bb_per_9 = data[i]['BB/9'] ?? null;
          const hr_per_9 = data[i]['HR/9'] ?? null;

          const babip_against = data[i].BABIP ?? null;
          const lob_pct = data[i]['LOB%'] ?? null;
          const gb_pct = data[i]['GB%'] ?? null;
          const hr_fb = data[i]['HR/FB'] ?? null;

          const velo_fb = data[i].FBv ?? null; // fastball velocity
          const era = data[i].ERA ?? null;
          const x_era = data[i].xERA ?? null;
          const fip = data[i].FIP ?? null;
          const x_fip = data[i].xFIP ?? null;
          const f_war = data[i].WAR ?? null;

          Logger.log(`Writing Pitcher Stats for FGID: ${fgId}`);
          await this.writePitcherStatsValues(
            fgId,
            mlbAmId,
            wins,
            loss,
            sv,
            games,
            games_started,
            innings_pitched,
            k_per_9,
            bb_per_9,
            hr_per_9,
            babip_against,
            lob_pct,
            gb_pct,
            hr_fb,
            velo_fb,
            era,
            x_era,
            fip,
            x_fip,
            f_war,
          );
        }

        return response;
      }
    } catch (error) {
      Logger.error(`PITCHER STATS UPDATE ERROR: ${error}`);
    }
  }

  // Writes values to DB table for Pitcher Stats
  async writePitcherStatsValues(
    fgId: string,
    mlbAmId: string,
    wins: number,
    loss: number,
    sv: number,
    games: number,
    games_started: number,
    innings_pitched: number,
    k_per_9: string,
    bb_per_9: string,
    hr_per_9: string,
    babip_against: string,
    lob_pct: string,
    gb_pct: string,
    hr_fb: string,
    velo_fb: string,
    era: string,
    x_era: string,
    fip: string,
    x_fip: string,
    f_war: string,
  ): Promise<void> {
    try {
      await this.pitcherStatsRepository.upsert(
        {
          fg_id: fgId,
          xmlbamid: mlbAmId,
          wins,
          loss,
          sv,
          games,
          games_started,
          innings_pitched,
          k_per_9,
          bb_per_9,
          hr_per_9,
          babip_against,
          lob_pct,
          gb_pct,
          hr_fb,
          velo_fb,
          era,
          x_era,
          fip,
          x_fip,
          f_war,
        },
        ['fg_id'],
      );
    } catch (error) {
      Logger.error(`THERE WAS AN ERROR! IN DATA REPO ${error}`);
    }
  }
}
