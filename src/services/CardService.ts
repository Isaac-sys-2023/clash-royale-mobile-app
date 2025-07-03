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
}