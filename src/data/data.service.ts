import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { baseUrl, currentDayEndpoint } from '../utils/globals';
import { JobStatus } from '../batch/enum/jobStatus.enum';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Batch } from '../batch/batch.entity';
import { GameData } from './gameData.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Batch)
    private batchRepository: Repository<Batch>,
    @InjectRepository(GameData)
    private dataRepository: Repository<GameData>,
  ) {}

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
}
