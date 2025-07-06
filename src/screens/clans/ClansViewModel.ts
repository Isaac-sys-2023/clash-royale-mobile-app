import { Clan, Clans, Members } from '@/src/models/Clan';
import { CurrentRiverRace, War } from '@/src/models/RiverRaceLog';
import { ClanService } from '@/src/services/ClanService';

export class ClansViewModel {
    private clanService: ClanService;
    private clans: Clans = { items: [] }
    private currentClan: Clan = this.createEmptyClan();
    private membersClan: Members = { items: [] }
    private riverRaceLogs: War = { items: [] }
    private currentWar: CurrentRiverRace = this.createEmptyCurrentWar()

    createEmptyClan(): Clan {
        return {
            tag: '',
            name: '',
            type: '',
            description: '',
            badgeId: 0,
            clanScore: 0,
            clanWarTrophies: 0,
            location: {
                id: 0,
                name: '',
                isCountry: false,
                countryCode: '',
                localizedName: 'string',
                flagUrl: 'string',
            },
            requiredTrophies: 0,
            donationsPerWeek: 0,
            clanChestStatus: '',
            clanChestLevel: 0,
            clanChestMaxLevel: 0,
            members: 0,
            memberList: [],
            clanChestPoints: 0,
            badgeUrls: {},
        }
    }

    createEmptyCurrentWar(): CurrentRiverRace {
        return {
            state: '',
            clan: {
                tag: '',
                name: '',
                badgeId: 0,
                fame: 0,
                repairPoints: 0,
                finishTime: '',
                participants: [],
                periodPoints: 0,
                clanScore: 0,
            },
            clans: [],
            collectionEndTime: "",
            warEndTime: "",
            sectionIndex: 0,
            periodIndex: 0,
            periodType: 'TRAINING',
            periodLogs: [],
        }
    }

    constructor() {
        this.clanService = new ClanService();
    }

    async loadClans(name: string, locationId?: number, minMembers?: number, maxMembers?: number, minScore?: number, limit?: number): Promise<void> {
        const clans = await this.clanService.getClans(name, locationId, minMembers, maxMembers, minScore, limit);
        this.clans = clans;
    }

    getClans() {
        return this.clans;
    }

    async loadClan(clanTag: string): Promise<void> {
        const clan = await this.clanService.getClan(clanTag);
        this.currentClan = clan;
        await this.loadMembersClan();
        await this.loadWarsClan();
        await this.loadCurrentWarClan();
    }

    getCurrentClan() {
        return this.currentClan;
    }

    async loadMembersClan(): Promise<void> {
        if (!this.currentClan.tag) {
            return
        }
        const members = await this.clanService.getClanMembers(this.currentClan.tag);
        this.membersClan = members;
    }

    getMembersClan() {
        return this.membersClan;
    }

    async loadWarsClan(): Promise<void> {
        if (!this.currentClan.tag) {
            return
        }
        const wars = await this.clanService.getWarsClan(this.currentClan.tag);
        this.riverRaceLogs = wars;
    }

    getWarsClan() {
        return this.riverRaceLogs;
    }

    async loadCurrentWarClan(): Promise<void> {
        if (!this.currentClan.tag) {
            return
        }
        const currentWar = await this.clanService.getCurrentWarClan(this.currentClan.tag);
        this.currentWar = currentWar;
    }

    getCurrentWarClan() {
        return this.currentWar;
    }

    validateAndConvertNumber(
        value: string,
        min: number,
        max: number,
        fieldName: string
    ): number {
        if (!/^\d+$/.test(value)) {
            throw new Error(`${fieldName} debe ser un número válido`);
        }

        const numValue = parseInt(value, 10);

        if (numValue < min || numValue > max) {
            throw new Error(`${fieldName} debe estar entre ${min} y ${max}`);
        }

        return numValue;
    };
}