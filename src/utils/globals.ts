// URLS for MLB Stats API
export const baseUrl = 'https://statsapi.mlb.com/api/v1';
export const currentDayEndpoint = 'schedule?sportId=1';

// URLs and global params for Fangraphs API
export const fangraphsBaseUrl = 'https://www.fangraphs.com/api';
export const season = '2025';

// stuff plus endpoint
export const stuffPlusEndpoint = `leaders/major-league/data?age=&pos=all&stats=pit&lg=all&qual=30&season=${season}&season1=${season}&startdate=${season}-03-01&enddate=${season}-11-01&month=0&sortcol=12&pageitems=20000`;
export const batterEndpoint = `leaders/major-league/data?age=&pos=all&stats=bat&lg=all&qual=0&type=8&season=${season}&season1=${season}&startdate=${season}-03-01&enddate=${season}-11-01&month=0&sortcol=13&pageitems=20000`;
// Fangraphs Player List
export const fgPlayerList = `leaders/major-league?pos=all&stats=pit&lg=all&type=8&month=0&ind=0&qual=30&startdate=&enddate=&season1=2015&season=2025`;
