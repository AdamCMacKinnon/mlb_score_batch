import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GameData } from './gameData.entity';

// @EntityRepository(GameData)
export class DataRepository extends Repository<GameData> {
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
      const game = this.create({
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
      await this.save(game);
    } catch (error) {
      Logger.error(`THERE WAS AN ERROR! IN DATA REPO ${error}`);
    }
  }
}
