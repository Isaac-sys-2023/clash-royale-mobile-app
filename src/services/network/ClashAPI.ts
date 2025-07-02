import { ApiService } from './ApiService';
import { CardsResponse } from '../../models/Card';

export class ClashRoyaleAPI extends ApiService {
  async getCards(): Promise<CardsResponse> {
    return this.get<CardsResponse>('/cards');
  }
}