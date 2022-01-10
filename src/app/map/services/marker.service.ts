import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from 'leaflet';
import {PopupService} from './popup.service';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../user/data/User";

@Injectable({
    providedIn: 'root'
})
export class MarkerService {
    private authUrl = environment.api_base_url;
    acteurs: string = '/assets/data/acteurs_consigne.geojson';

    constructor(
        private http: HttpClient,
        private popupService: PopupService
    ) {
    }

    static scaledRadius(val: number, maxVal: number): number {
        return 20 * (val / maxVal);
    }

    makeCapitalMarkers(map: L.Map, users: User[]): void {
        users.map(user => {
            if (user.lat && user.lon) {
                const marker = L.marker([Number(user.lat), Number(user.lon)]);
                marker.addTo(map);
            }
        })
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
        })
    }
}
