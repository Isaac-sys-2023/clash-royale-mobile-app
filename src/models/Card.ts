export interface Card {
  name: string;
  id: number;
  maxLevel: number;
  maxEvolutionLevel?: number;
  elixirCost: number;
  iconUrls: {
    medium: string;
    evolutionMedium?: string;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  evolutionCycle: number;
}

export interface CardsResponse {
  items: Card[];
  supportItems: Card[];
}