export interface Location {
    id: number;
    name: string;
    isCountry: boolean;
    countryCode?: string;
    localizedName?:string;
    flagUrl?: string;
}

// /locations
export interface Locations {
    items: Location[]
}