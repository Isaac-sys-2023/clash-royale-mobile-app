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
    try {
      const cleanTag = tag.replace('#', '');

      if (!cleanTag) {
        throw new Error('El tag del jugador no puede estar vacío');
      }

      return this.get<Player>(`/players/${cleanTag}`)
    } catch (error) {
      console.error('Error fetching player data:', error);
      throw error;
    }
  }
}