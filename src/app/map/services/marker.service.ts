import {Injectable} from '@angular/core';
import * as L from 'leaflet';
import {User} from "../../user/data/User";
import {LayerGroup} from "leaflet";

@Injectable({
    providedIn: 'root'
})
export class MarkerService {

    constructor() {
    }

    makeCapitalMarkers(map: L.Map, users: User[]): { Producteurs: LayerGroup<any>; Distributeurs: LayerGroup<any>; "Points de collectes": LayerGroup<any> } {

        let producers = L.layerGroup().addTo(map);
        let resellers = L.layerGroup().addTo(map);
        let collecte_points = L.layerGroup().addTo(map);

        const producersIcon = L.icon({
            iconUrl: '/assets/icones/producer.png',
            iconSize: [35, 35] // size of the icon
        });

        const resellersIcon = L.icon({
            iconUrl: '/assets/icones/reseller.png',
            iconSize: [35, 35] // size of the icon
        });

        const collectePointIcon = L.icon({
            iconUrl: '/assets/icones/collect_point.png',
            iconSize: [35, 35] // size of the icon
        });

        users.map(user => {
            if (user.lat && user.lon) {

                if (user.producer) {
                    L.marker(
                        [Number(user.lat), Number(user.lon)],
                        {icon: producersIcon}
                    ).bindPopup(
                        '<div> nom : ' + user.username + '</div>' + '<div> mail : ' + user.email + '</div>'
                    ).addTo(producers);
                }

                if (user.reseller) {
                    L.marker(
                        [Number(user.lat), Number(user.lon)],
                        {icon: resellersIcon}
                    ).bindPopup(
                        '<div> nom : ' + user.username + '</div>' + '<div> mail : ' + user.email + '</div>'
                    ).addTo(resellers);
                }

                if (user.collecte_point) {
                    L.marker(
                        [Number(user.lat), Number(user.lon)],
                        {icon: collectePointIcon}
                    ).bindPopup(
                        '<div> nom : ' + user.username + '</div>' + '<div> mail : ' + user.email + '</div>'
                    ).addTo(collecte_points);
                }
            }
        })
        return {
            'Producteurs': producers,
            'Distributeurs': resellers,
            'Points de collectes': collecte_points
        }
    }

    /*
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
    }*/
}
