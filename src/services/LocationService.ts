import { Locations } from '../models/Location';
import { ClashRoyaleAPI } from './network/ClashAPI';

export class LocationService {
  private api: ClashRoyaleAPI;

  constructor() {
    this.api = new ClashRoyaleAPI();
  }

  async getLocations(): Promise<Locations> {
    return this.api.getLocations();
  }
}