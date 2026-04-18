import { Logger } from '@nestjs/common';

// URLS for MLB Stats API
export const baseUrl = 'https://statsapi.mlb.com/api/v1';
export const currentDayEndpoint = 'schedule?sportId=1';

// URLs and global params for Fangraphs API
export const fangraphsBaseUrl = 'https://www.fangraphs.com/api';
export const season = '2026';

// stuff plus endpoint
export const stuffPlusEndpoint = `leaders/major-league/data?age=&pos=all&stats=pit&lg=all&qual=30&season=${season}&season1=${season}&startdate=${season}-03-01&enddate=${season}-11-01&month=0&sortcol=12&pageitems=20000`;
export const batterEndpoint = `leaders/major-league/data?age=&pos=all&stats=bat&lg=all&qual=0&type=8&season=${season}&season1=${season}&startdate=${season}-03-01&enddate=${season}-11-01&month=0&sortcol=13&pageitems=20000`;
// Fangraphs Player List
export const fgPlayerList = `leaders/major-league?pos=all&stats=pit&lg=all&type=8&month=0&ind=0&qual=30&startdate=&enddate=&season1=2015&season=2025`;

export function jobIdCreator(jobType: string) {
  const jobId = crypto.randomUUID();
  try {
    const slicedUUID = jobId.slice(0, 8);
    const datePart = new Date().toISOString().split('T')[0].replace(/-/g, '');
    let jobTypeParam: string;

    switch (jobType) {
      case 'score_updates':
        jobTypeParam = 'su';
        break;
      case 'stuff_plus_update':
        jobTypeParam = 'sp';
        break;
      case 'pitcher_stats_update':
        jobTypeParam = 'ps';
        break;
      case 'pitcher_list_update':
        jobTypeParam = 'plu';
        break;
      case 'batter_list_update':
        jobTypeParam = 'blu';
        break;
      case 'batter_stats_update':
        jobTypeParam = 'bs';
        break;
      default:
        jobTypeParam = 'unknown';
    }
    return `${slicedUUID}-${datePart}-${jobTypeParam}`;
  } catch (error) {
    Logger.error('Error Creating Job ID: ***  ' + error);
  }
}
