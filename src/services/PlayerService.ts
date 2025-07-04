import { ClashRoyaleAPI } from './network/ClashAPI';
import { Player } from '../models/Player';
import { BattlePlayerLog } from '../models/BattlePlayerLog';

export class PlayerService {
    private api: ClashRoyaleAPI;

    constructor() {
        this.api = new ClashRoyaleAPI();
    }

    async getPlayer(tag: string): Promise<Player> {
        return this.api.getPlayer(tag);
    }

    async getBattlePlayerLog(tag: string): Promise<BattlePlayerLog> {
        try {
            const battleLog = await this.api.getBattlePlayerLog(tag);
            return Array.isArray(battleLog) ? { battles: battleLog } : battleLog;
        } catch (error) {
            console.error('Error getting battle log:', error);
            throw error;
        }
    }
}