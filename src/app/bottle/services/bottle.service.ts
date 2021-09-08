import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthService} from "../../shared/services/auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bottle} from "../data/Bottle";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class BottleService {
    private authUrl = environment.api_base_url;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {
    }

    countAllBottles(filter?: string): Observable<number> {
        let params = new HttpParams();
        if (filter) {
            params = params.set('Nom_contains', filter);
        }
        const options = {
            params
        };
        return this.http.get(this.authUrl + '/bottles/count', options).pipe(
            map((res: any) => res)
        );
    }

    getBottles(filter?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Bottle[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'name')
            .set('_direction', sortDirection ? sortDirection : 'ASC')
            .set('_start', pageNumber && pageSize ? (pageNumber * pageSize).toString() : '0')
            .set('_limit', pageSize ? pageSize.toString() : '10');
        if (filter) {
            params = params.set('name_contains', filter);
        }
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/bottles', options).pipe(
            map((res: any) => res)
        );
    }

    getOneBottle(idBottle: string): Observable<Bottle> {
        return this.http.get(this.authUrl + '/bottles/' + idBottle).pipe(
            map((res: any) => res)
        );
    }

    addBottle(bottle: Bottle): Observable<Bottle> {
        const formData = new FormData();
        formData.append('name', bottle.name);
        formData.append('code', bottle.code);
        formData.append('description', bottle.description);
        formData.append('img_bottle', bottle.img_bottle);

        return this.http.post(this.authUrl + '/bottles', formData).pipe(
            map((newBottle: any) => newBottle)
        );
    }

    editBottle(idBottle: string, bottle: FormData): Observable<Bottle> {
        // const formData = new FormData();
        // formData.append('name', bottle.name);
        // formData.append('code', bottle.code);
        // formData.append('description', bottle.description);
        // formData.append('img_bottle', bottle.img_bottle);

        return this.http.put(this.authUrl + '/bottles/' + idBottle, bottle).pipe(
            map((newBottle: any) => newBottle)
        );
    }

    deleteBottle(idBottle: string): Observable<void> {
        return this.http.delete(`${this.authUrl}/bottles/${idBottle}`).pipe(
            map(() => {
                console.log('Type de bouteille supprimé');
            })
        );
    }
}
