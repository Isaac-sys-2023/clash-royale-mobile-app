import { Card } from './Card';

// models/Badge.ts
export interface Badge {
  name: string;
  level?: number;
  maxLevel?: number;
  progress?: number;
  target?: number;
  iconUrls: {
    large: string;
  };
}

// models/Achievement.ts
export interface Achievement {
  name: string;
  stars: number;
  value: number;
  target: number;
  info: string;
  completionInfo: string | null;
}

// models/Clan.ts
export interface Clan {
  tag: string;
  name: string;
  badgeId: number;
}

// models/Arena.ts
export interface Arena {
  id: number;
  name: string;
}

// models/LeagueStatistics.ts
export interface SeasonStats {
  id?: string;
  rank?: number;
  trophies: number;
  bestTrophies?: number;
}

export interface LeagueStatistics {
  currentSeason: SeasonStats;
  previousSeason: SeasonStats;
  bestSeason: SeasonStats;
}

// models/PathOfLegendSeasonResult.ts
export interface PathOfLegendSeasonResult {
  leagueNumber: number;
  trophies: number;
  rank: number;
}

// models/Progress.ts
export interface ProgressEntry {
  arena: {
    id: number;
    name: string;
  };
  trophies: number;
  bestTrophies: number;
}

export interface Progress {
  [key: string]: ProgressEntry;
}

// models/Player.ts
export interface Player {
  tag: string;
  name: string;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  wins: number;
  losses: number;
  battleCount: number;
  threeCrownWins: number;
  challengeCardsWon: number;
  challengeMaxWins: number;
  tournamentCardsWon: number;
  tournamentBattleCount: number;
  role: string;
  donations: number;
  donationsReceived: number;
  totalDonations: number;
  warDayWins: number;
  clanCardsCollected: number;
  clan: Clan;
  arena: Arena;
  leagueStatistics: LeagueStatistics;
  badges: Badge[];
  achievements: Achievement[];
  cards: Card[];
  supportCards: Card[];
  currentDeck: Card[];
  currentDeckSupportCards: Card[];
  currentFavouriteCard: Card;
  starPoints: number;
  expPoints: number;
  legacyTrophyRoadHighScore: number;
  currentPathOfLegendSeasonResult: PathOfLegendSeasonResult;
  lastPathOfLegendSeasonResult: PathOfLegendSeasonResult;
  bestPathOfLegendSeasonResult: PathOfLegendSeasonResult;
  progress: Progress;
  totalExpPoints: number;
}