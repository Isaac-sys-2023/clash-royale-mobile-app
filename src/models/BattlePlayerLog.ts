import { Card } from "./Card";

export interface BattleArena {
  id: number;
  name: string;
}

export interface GameMode {
  id: number;
  name: string;
}

export interface BattleClan {
  tag: string;
  name: string;
  badgeId: number;
}

export interface BattlePlayer {
  tag: string;
  name: string;
  startingTrophies: number;
  trophyChange: number;
  crowns: number;
  kingTowerHitPoints: number;
  princessTowersHitPoints: number[] | null;
  clan: BattleClan;
  cards: Card[];
  supportCards: Card[];
  globalRank?: number;
  elixirLeaked: number;
}

export interface BattleLog {
  type: string;
  battleTime: string;
  isLadderTournament: boolean;
  arena: BattleArena;
  gameMode: GameMode;
  deckSelection: string;
  team: BattlePlayer[];
  opponent: BattlePlayer[];
  isHostedMatch: boolean;
  leagueNumber?: number;
}

export interface BattlePlayerLog {
  battles: BattleLog[];
}