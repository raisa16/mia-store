import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { LocationService } from '@shared/services/location.service';
import {
  GoogleMap,
  MapAdvancedMarker,
  MapInfoWindow,
} from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Location } from '@shared/models/location.model.ts';

@Component({
  selector: 'app-locations',
  imports: [
    CommonModule,
    GoogleMap,
    FormsModule,
    MapAdvancedMarker,
    MapInfoWindow,
  ],
  templateUrl: './locations.component.html',
})
export default class LocationsComponent {
  private locationService = inject(LocationService);
  infoWindowRef = viewChild.required(MapInfoWindow);
  markersRef = viewChildren(MapAdvancedMarker);

  center = signal<google.maps.LatLngLiteral>({
    lat: 21.4983959,
    lng: -104.8852469,
  });
  zoom = signal(10);

  locations$ = this.locationService.getAllLocations(this.center());
  $locations = toSignal(this.locations$, {
    initialValue: [],
  });
  openInfoWindow(location: Location, marker: MapAdvancedMarker) {
    const content = `
    <h1 class="font-bold text-2x1">${location.name}</h1>
    <p>${location.description}</p>
  `;
    this.infoWindowRef().open(marker, false, content);
  }

  goToPlace(location: Location, position: number) {
    const markers = this.markersRef();
    const markersRef = markers[position];

    this.openInfoWindow(location, markersRef);
  }
}
