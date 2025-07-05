import { ApiService } from './ApiService';
import { CardsResponse } from '../../models/Card';
import { Player } from '@/src/models/Player';
import { BattlePlayerLog } from '@/src/models/BattlePlayerLog';
import { Locations } from '@/src/models/Location';

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

  async getBattlePlayerLog(tag: string): Promise<BattlePlayerLog> {
    try {
      const cleanTag = tag.replace('#', '');

      if (!cleanTag) {
        throw new Error('El tag del jugador no puede estar vacío');
      }
      
      return this.get<BattlePlayerLog>(`/players/${cleanTag}/battlelog`)
    } catch (error) {
      console.error('Error fetching player battlelog data:', error);
      throw error;
    }
  }

  //location endpoints
  async getLocations(): Promise<Locations> {
    try {
      return this.get<Locations>(`/locations`)
    } catch (error) {
      console.error('Error fetching locations data:', error);
      throw error;
    }
  }
}