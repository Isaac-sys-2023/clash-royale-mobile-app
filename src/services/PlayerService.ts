import { ClashRoyaleAPI } from './network/ClashAPI';
import { Player } from '../models/Player';

export class PlayerService {
  private api: ClashRoyaleAPI;

  constructor() {
    this.api = new ClashRoyaleAPI();
  }

  async getPlayer(tag: string): Promise<Player> {
    return this.api.getPlayer(tag);
  }
}