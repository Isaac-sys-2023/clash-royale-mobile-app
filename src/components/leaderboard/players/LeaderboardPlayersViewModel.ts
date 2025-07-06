import { LocationService } from '@/src/services/LocationService';
import { Location, PathOfLegendsPlayer } from '@/src/models/Location';

export class LeaderboardPlayersViewModel {
    private locationService: LocationService;
    private countries: Location[] = [];
    private myCountry: string = "Brazil";
    private topLocalPlayers: PathOfLegendsPlayer[] = []

    constructor() {
        this.locationService = new LocationService();
    }

    async initialize(): Promise<void> {
        await this.loadCountries();
        await this.getUserCountry();
    }

    async loadCountries(): Promise<void> {
        const response = await this.locationService.getLocations();
        this.countries = response.items.filter(loc => loc.isCountry);
    }

    getCountries(): Location[] {
        return this.countries;
    }

    async getUserCountry(): Promise<void> {
        const response = await this.locationService.getUserCountry();
        this.myCountry = response || 'Brazil';
    }

    getDefaultCountry(): Location {
        return this.findCountryByName('Brazil') || this.countries[0];
    }

    getMyCountry(): Location {
        return this.findCountryByName(this.myCountry) || this.getDefaultCountry();
    }

    private findCountryByName(name: string): Location | undefined {
        return this.countries.find(c => 
            this.normalizeString(c.name) === this.normalizeString(name)
        );
    }

    private normalizeString = (str: string) => str.toLowerCase().trim();

    async getTopRankLocalPlayers(countryId: number, limit: number): Promise<PathOfLegendsPlayer[]> {
        try {
            const response = await this.locationService.getTopPlayersLocation(countryId, limit);
            this.topLocalPlayers = response.items || [];
            return this.topLocalPlayers;
        } catch (error) {
            console.error("Error fetching top players:", error);
            return [];
        }
    }

    getLocalHomeRankPlayers(): PathOfLegendsPlayer[] {
        return this.topLocalPlayers;
    }
}