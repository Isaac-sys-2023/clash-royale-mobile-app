import { Card } from '../../models/Card';
import { CardService } from '../../services/CardService';

export class CardsViewModel {
  private cardService: CardService;
  private cards: Card[] = [];
  private supportCards: Card[] = [];

  private currentFilter: {
    type: 'all' | 'evo' | 'elixir' | 'rarity' | 'cardType';
    param?: any;
  } = { type: 'all' };

  constructor() {
    this.cardService = new CardService();
  }

  async loadAllCards(): Promise<void> {
    const { items, supportItems } = await this.cardService.getAllCards();
    this.cards = items;
    this.supportCards = supportItems;
  }

  setFilter(type: 'all' | 'evo'): void;
  setFilter(type: 'elixir', cost: number): void;
  setFilter(type: 'rarity', rarity: string): void;
  setFilter(type: 'cardType', cardType: 'card' | 'support'): void;
  
  setFilter(type: any, param?: any): void {
    this.currentFilter = { type, param };
  }

  getFilteredCards() {
    switch (this.currentFilter.type) {
      case 'all':
        return {
          cards: this.cards,
          supportCards: this.supportCards
        };
      
      case 'evo':
        return {
          cards: this.cards.filter(c => c.maxEvolutionLevel && c.maxEvolutionLevel > 0),
          supportCards: []
        };
      
      case 'elixir':
        return {
          cards: this.cards.filter(c => c.elixirCost === this.currentFilter.param),
          supportCards: []
        };
      
      case 'rarity':
        return {
          cards: this.cards.filter(c => c.rarity === this.currentFilter.param),
          supportCards: this.supportCards.filter(c => c.rarity === this.currentFilter.param),
        };
      
      case 'cardType':
        return this.currentFilter.param === 'card' 
          ? { cards: this.cards, supportCards: [] }
          : { cards: [], supportCards: this.supportCards };
      
      default:
        return { cards: [], supportCards: [] };
    }
  }

  getCurrentFilter() {
    return this.currentFilter;
  }
}