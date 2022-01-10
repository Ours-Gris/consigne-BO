import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NominatimService {
    private BASE_NOMINATIM_URL: string = 'nominatim.openstreetmap.org';
    private DEFAULT_VIEW_BOX: string = 'viewbox=-25.0000%2C70.0000%2C50.0000%2C40.0000';

    constructor(
        private http: HttpClient) {
    }

    addressLookup(address: string): Observable<any> {
        let url = `https://${this.BASE_NOMINATIM_URL}/search?format=json&q=${address}&${this.DEFAULT_VIEW_BOX}&bounded=1`;
        return this.http.get(url).pipe(
            map((data) => {
                    return data
                }
            )
        )
    }
}
