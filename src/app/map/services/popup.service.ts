import {Injectable} from '@angular/core';
import {User} from "../../user/data/User";
import * as L from 'leaflet';

@Injectable({
    providedIn: 'root'
})
export class PopupService {

    constructor() {
    }
    /*
    makeCapitalPopup(data: any): string {
        return `` +
            `<div>Nom : ${data.nom}</div>` +
            `<div>Type : ${data.type_lieu}</div>` +
            `<div>Nombre de bouteilles collectées : ${data.nb_bouteilles_collectees}</div>`
    }*/
    /*
    makeCapitalPopup(map: L.Map, users: User[]): void {
        users.map(user => {
            if (user.lat && user.lon) {
                const popup = L.popup([Number(user.lat), Number(user.lon)]);
                popup.addTo(map);
            }
        })
    }*/
}
