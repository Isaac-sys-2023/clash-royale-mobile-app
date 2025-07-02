import { Card } from '../../models/Card';
import { CardService } from '../../services/CardService';

export class CardsViewModel {
  private cardService: CardService;
  private cards: Card[] = [];
  private supportCards: Card[] = [];

  constructor() {
    this.cardService = new CardService();
  }

  async loadAllCards(): Promise<void> {
    const { items, supportItems } = await this.cardService.getAllCards();
    this.cards = items;
    this.supportCards = supportItems;
  }

  getCards(): Card[] {
    return this.cards;
  }

  getSupportCards(): Card[] {
    return this.supportCards;
  }

  getCardById(id: number): Card | undefined {
    return [...this.cards, ...this.supportCards].find(card => card.id === id);
  }

  async getCardsByRarity(rarity: string): Promise<Card[]> {
    return this.cardService.getCardsByRarity(rarity);
  }
}