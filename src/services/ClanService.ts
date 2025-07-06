import { Clan, Clans } from '../models/Clan';
import { CurrentRiverRace, War } from '../models/RiverRaceLog';
import { ClashRoyaleAPI } from './network/ClashAPI';

export class PlayerService {
    private api: ClashRoyaleAPI;

    constructor() {
        this.api = new ClashRoyaleAPI();
    }

    async getClan(clanTag: string): Promise<Clan> {
        return await this.api.getClan(clanTag);
    }

    async getClans(name: string, locationId?: number, minMembers?: number, maxMembers?: number, minScore?: number, limit?: number): Promise<Clans> {
        return await this.api.getClans(name, locationId, minMembers, maxMembers, minScore, limit);
    }

    async getClanMembers(clanTag: string): Promise<Clan> {
        return await this.api.getClanMembers(clanTag);
    }

    async getWarsClan(clanTag: string): Promise<War> {
        return await this.api.getWarsClan(clanTag)
    }

    async getCurrentWarClan(clanTag: string): Promise<CurrentRiverRace> {
        return await this.api.getCurrentWarClan(clanTag)
    }

}
