import { Locations, PathOfLegendsPlayers } from '../models/Location';
import { ClashRoyaleAPI } from './network/ClashAPI';

export class LocationService {
  private api: ClashRoyaleAPI;

  constructor() {
    this.api = new ClashRoyaleAPI();
  }

  async getLocations(): Promise<Locations> {
    return this.api.getLocations();
  }

  async getUserCountry(): Promise<string | null> {
    try {
      const response = await fetch('http://ip-api.com/json/?fields=country,countryCode');
      const data = await response.json();
      return data.country;
    } catch (error) {
      console.error("Error fetching country:", error);
      return null;
    }
  }

  async getTopPlayersLocation(locationId: number, limit?: number): Promise<PathOfLegendsPlayers> {
    return this.api.getTopPlayersLocation(locationId, limit)
  }
}