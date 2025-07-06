import { Clan } from "./Player";

export interface Location {
    id: number;
    name: string;
    isCountry: boolean;
    countryCode?: string;
    localizedName?: string;
    flagUrl?: string;
}

// /locations
export interface Locations {
    items: Location[]
}

// /locations/{id}/pathoflegend/players
export interface PathOfLegendsPlayer {
    tag: string;
    name: string;
    expLevel: number;
    eloRating: number;
    rank: number;
    clan: Clan
}

export interface PathOfLegendsPlayers {
    items: PathOfLegendsPlayer[];
}