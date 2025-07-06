import { Arena } from "./Player";
import { Location } from "./Location"

// /clan/{tag}/members
export interface Member {
    tag: string,
    name: string,
    role: string,
    lastSeen: string,
    expLevel: number,
    trophies: number,
    arena: Arena;
    clanRank: number;
    previousClanRank: number;
    donations: number;
    donationsReceived: number;
    clanChestPoints: number;
}

export interface Members {
    items: Member[];
}

// /clan/{tag} /clans
export interface Clan {
    tag: string;
    name: string;
    type: string;
    description: string;
    badgeId: number;
    clanScore: number;
    clanWarTrophies: number;
    location: Location;
    requiredTrophies: number;
    donationsPerWeek: number;
    clanChestStatus: string;
    clanChestLevel: number;
    clanChestMaxLevel: number;
    members: number;
    memberList: Member[];
    clanChestPoints?: number;
    badgeUrls?: {};
}

export interface Clans {
    items: Clan[]
}