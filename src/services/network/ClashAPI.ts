import { ApiService } from './ApiService';
import { CardsResponse } from '../../models/Card';
import { Player } from '@/src/models/Player';
import { BattlePlayerLog } from '@/src/models/BattlePlayerLog';
import { Locations, PathOfLegendsPlayers } from '@/src/models/Location';
import { Clan, Clans, Members } from '@/src/models/Clan';
import { CurrentRiverRace, War } from '@/src/models/RiverRaceLog';

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

  async getTopPlayersLocation(locationId: number, limit?: number): Promise<PathOfLegendsPlayers> {
    try {
      const params = new URLSearchParams();

      if (limit) params.append('limit', limit.toString());

      return this.get<PathOfLegendsPlayers>(`/locations/${locationId}/pathoflegend/players?${params.toString()}`)
    } catch (error) {
      console.error('Error fetching top players data:', error);
      throw error;
    }
  }

  //clans endpoints
  async getClan(clanTag: string): Promise<Clan> {
    try {
      const cleanTag = clanTag.replace('#', '');

      if (!cleanTag) {
        throw new Error('El tag del clan no puede estar vacío');
      }

      return this.get<Clan>(`/clans/${cleanTag}`)
    } catch (error) {
      console.error('Error fetching clan data:', error);
      throw error;
    }
  }

  async getClans(name: string, locationId?: number, minMembers?: number, maxMembers?: number, minScore?: number, limit?: number): Promise<Clans> {
    try {
      const params = new URLSearchParams();
      params.append('name', name);

      if (locationId) params.append('locationId', locationId.toString());
      if (minMembers) params.append('minMembers', minMembers.toString());
      if (maxMembers) params.append('maxMembers', maxMembers.toString());
      if (minScore) params.append('minScore', minScore.toString());
      if (limit) params.append('limit', limit.toString());

      return this.get<Clans>(`/clans?${params.toString()}`)
    } catch (error) {
      console.error('Error fetching clan data:', error);
      throw error;
    }
  }

  async getClanMembers(clanTag: string): Promise<Members> {
    try {
      const cleanTag = clanTag.replace('#', '');

      if (!cleanTag) {
        throw new Error('El tag del clan no puede estar vacío');
      }

      return this.get<Members>(`/clans/${cleanTag}/members`)
    } catch (error) {
      console.error('Error fetching clan members data:', error);
      throw error;
    }
  }

  async getWarsClan(clanTag: string): Promise<War> {
    try {
      const cleanTag = clanTag.replace('#', '');

      if (!cleanTag) {
        throw new Error('El tag del clan no puede estar vacío');
      }

      return this.get<War>(`/clans/${cleanTag}/riverracelog`)
    } catch (error) {
      console.error('Error fetching clan wars data:', error);
      throw error;
    }
  }

  async getCurrentWarClan(clanTag: string): Promise<CurrentRiverRace> {
    try {
      const cleanTag = clanTag.replace('#', '');

      if (!cleanTag) {
        throw new Error('El tag del clan no puede estar vacío');
      }

      return this.get<CurrentRiverRace>(`/clans/${cleanTag}/currentriverrace`)
    } catch (error) {
      console.error('Error fetching clan current war data:', error);
      throw error;
    }
  }
}