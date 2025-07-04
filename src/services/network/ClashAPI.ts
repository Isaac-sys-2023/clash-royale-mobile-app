import { ApiService } from './ApiService';
import { CardsResponse } from '../../models/Card';
import { Player } from '@/src/models/Player';

export class ClashRoyaleAPI extends ApiService {
  //cards endpoints
  async getCards(): Promise<CardsResponse> {
    return this.get<CardsResponse>('/cards');
  }

  //players endpoints
  async getPlayer(tag: string): Promise<Player> {
    return this.get<Player>(`players/${tag}`)
  } 
}