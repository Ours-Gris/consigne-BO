import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';
import {PopupService} from './popup.service';

@Injectable({
    providedIn: 'root'
})
export class MarkerService {
    acteurs: string = '/assets/data/acteurs_consigne.geojson';

    constructor(
        private http: HttpClient,
        private popupService: PopupService
    ) {
    }

    static scaledRadius(val: number, maxVal: number): number {
        return 20 * (val / maxVal);
    }

    makeCapitalMarkers(map: L.Map): void {
        this.http.get(this.acteurs).subscribe((res: any) => {
            for (const c of res.features) {
                const lon = c.geometry.coordinates[0];
                const lat = c.geometry.coordinates[1];
                const marker = L.marker([lat, lon]);

                marker.addTo(map);
            }
        });

    }

    makeCapitalCircleMarkers(map: L.Map): void {
        this.http.get(this.acteurs).subscribe((res: any) => {

            const max_bouteilles_collectees = Math.max(...res.features.map((x: any) => x.properties.nb_bouteilles_collectees), 0);

            for (const c of res.features) {
                const lon = c.geometry.coordinates[0];
                const lat = c.geometry.coordinates[1];
                const circle = L.circleMarker([lat, lon], {
                    radius: MarkerService.scaledRadius(c.properties.nb_bouteilles_collectees, max_bouteilles_collectees)
                });

                circle.bindPopup(this.popupService.makeCapitalPopup(c.properties));

                circle.addTo(map);
            }
        });
    }
}
