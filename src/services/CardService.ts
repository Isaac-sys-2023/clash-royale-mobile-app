import { ClashRoyaleAPI } from './network/ClashAPI';
import { Card, CardsResponse } from '../models/Card';

export class CardService {
  private api: ClashRoyaleAPI;

  constructor() {
    this.api = new ClashRoyaleAPI();
  }

  async getAllCards(): Promise<CardsResponse> {
    return this.api.getCards();
  }

  async getCardsByRarity(rarity: string): Promise<Card[]> {
    const { items, supportItems } = await this.api.getCards();
    return [...items, ...supportItems].filter(card => card.rarity === rarity);
  }
}