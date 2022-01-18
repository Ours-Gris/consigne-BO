import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class StatistiqueService {

    constructor(private http: HttpClient) {
    }

    getIsochroneStats(): any {
        return this.http.get('/assets/data/isochrone_lansargues_15_30_45_60_min.geojson');
    }
}
