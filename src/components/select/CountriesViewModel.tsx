import { LocationService } from '@/src/services/LocationService';
import { Location } from '@/src/models/Location';

export class CountriesViewModel {
  private locationService: LocationService;
  private countries: Location[] = [];

  constructor() {
    this.locationService = new LocationService();
  }

  async loadCountries(): Promise<Location[]> {
    const response = await this.locationService.getLocations();
    this.countries = response.items.filter(loc => loc.isCountry);
    return this.countries;
  }

  getCountries(): Location[] {
    return this.countries;
  }
}