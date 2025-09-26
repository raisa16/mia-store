import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Location } from '@shared/models/location.model.ts';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;

  async getLocations(params: { origin: string }): Promise<Location[]> {
    const url = new URL(`${this.url}/api/v1/locations`);
    if (params.origin) {
      url.searchParams.set('origin', params.origin);
    }
    const response = await fetch(url.toString());
    return response.json();
  }
  getAllLocations(origin: { lat: number; lng: number }) {
    const url = new URL(`${this.url}/api/v1/locations`);

    return this.http.get<Location[]>(url.toString(), {
      params: {
        origin: `${origin.lat},${origin.lng}`,
        size: 10,
      },
    });
  }
}
