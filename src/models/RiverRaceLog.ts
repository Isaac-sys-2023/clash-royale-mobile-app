//  /clans/{tag}/currentriverracelog
//  /clans/{tag}/riverracelog
export interface Participant {
    tag: string;
    name: string;
    fame: number;
    repairPoints: number;
    boatAttacks: number;
    deckUsed: number;
    deckUsedToday: number;
}

export interface RiverClan {
    tag: string,
    name: string,
    badgeId: number,
    fame: number;
    repairPoints: number;
    finishTime: string;
    participants: Participant[];
    periodPoints: number;
    clanScore: number;
}

export interface Standing{
    rank: number;
    trophyChange: number;
    clan: RiverClan[];    
}

export interface WarWeek{
    seasonId: number;
    sectionIndex: number;
    createdDate: string;
    standings: Standing[];
}

export interface War{
    items: WarWeek[];
}


export interface CurrentRiverRace {
  state: string;
  clan: RiverClan;
  clans: RiverClan[];
  collectionEndTime: string;
  warEndTime: string;
  sectionIndex: number;
  periodIndex: number;
  periodType: 'TRAINING' | 'WAR_DAY' | 'COLOSSEUM';
  periodLogs: PeriodLog[];
}

interface PeriodLog {
  items: PeriodLogEntry[];
  periodIndex: number;
}

interface PeriodLogEntry {
  clan: { tag: string };
  pointsEarned: number;
  progressStartOfDay: number;
  progressEndOfDay: number;
  endOfDayRank: number;
  progressEarned: number;
  numOfDefensesRemaining: number;
  progressEarnedFromDefenses: number;
}