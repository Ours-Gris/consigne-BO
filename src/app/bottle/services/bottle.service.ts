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

    getBottlesExport(): Observable<Bottle[]> {
        return this.http.get(this.authUrl + '/bottles/export').pipe(
            map((res: any) => res)
        );
    }

    getOneBottle(idBottle: string): Observable<Bottle> {
        return this.http.get(this.authUrl + '/bottles/' + idBottle).pipe(
            map((res: any) => res)
        );
    }

    makeFormData(bottle: Bottle): FormData {
        const formData = new FormData();
        formData.append('name', bottle.name);
        formData.append('code', bottle.code);
        formData.append('description', bottle.description);
        formData.append('price', String(bottle.price));
        formData.append('nbr_by_palette', String(bottle.nbr_by_palette));
        formData.append('internal_stock', String(bottle.internal_stock));
        formData.append('internal_stock_dirty', String(bottle.internal_stock_dirty));
        formData.append('img_bottle', bottle.img_bottle);
        // For delete old img
        if (bottle.img_name) {
            formData.append('img_name', bottle.img_name);
        }
        formData.append('pdf_bottle', bottle.pdf_bottle);
        // For delete old img
        if (bottle.pdf_name) {
            formData.append('pdf_name', bottle.pdf_name);
        }
        return formData
    }

    addBottle(bottle: Bottle): Observable<Bottle> {
        return this.http.post(this.authUrl + '/bottles', this.makeFormData(bottle)).pipe(
            map((newBottle: any) => newBottle)
        );
    }

    editBottle(idBottle: string, bottle: Bottle): Observable<Bottle> {
        return this.http.put(this.authUrl + '/bottles/' + idBottle, this.makeFormData(bottle)).pipe(
            map((newBottle: any) => newBottle)
        );
    }

    deleteBottle(idBottle: string): Observable<void> {
        return this.http.delete(`${this.authUrl}/bottles/${idBottle}`).pipe(
            map(() => {
                console.log('Type de bouteille supprimé');
            })
        )
    }

    getBottleFile(fileName: string) {
        return this.http.get(this.authUrl + '/bottles/file/' + fileName,{ responseType: 'blob' })
    }
}
