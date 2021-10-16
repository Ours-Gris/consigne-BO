import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {AuthService} from "../shared/services/auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Collecte} from "./data/Collecte";

@Injectable({
    providedIn: 'root'
})
export class CollecteService {

    private authUrl = environment.api_base_url;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {
    }

    countWaitingCollectes(filter?: string): Observable<number> {
        let params = new HttpParams();
        if (filter) {
            params = params.set('Nom_contains', filter);
        }
        const options = {
            params
        };
        return this.http.get(this.authUrl + '/collectes/waiting/count', options).pipe(
            map((res: any) => res)
        );
    }

    countUserCollectes(idUser: string): Observable<number> {
        return this.http.get(this.authUrl + '/collectes/count/' + idUser).pipe(
            map((res: any) => res)
        );
    }

    getUserCollectes(idUser: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Collecte[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'createdAt')
            .set('_direction', sortDirection ? sortDirection : 'DESC')
            .set('_start', pageNumber && pageSize ? (pageNumber * pageSize).toString() : '0')
            .set('_limit', pageSize ? pageSize.toString() : '5');
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/collectes/user/' + idUser, options).pipe(
            map((res: any) => res)
        );
    }

    getWaitingCollectes(filter?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Collecte[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'createdAt')
            .set('_direction', sortDirection ? sortDirection : 'DESC')
            .set('_start', pageNumber && pageSize ? (pageNumber * pageSize).toString() : '0')
            .set('_limit', pageSize ? pageSize.toString() : '5');
        if (filter) {
            params = params.set('status_contains', filter);
        }
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/collectes/waiting', options).pipe(
            map((res: any) => res)
        );
    }

    getCollectesExport(): Observable<Collecte[]> {
        return this.http.get(this.authUrl + '/collectes/export').pipe(
            map((res: any) => res)
        );
    }

    getOneCollecte(idCollecte: string): Observable<Collecte> {
        return this.http.get(this.authUrl + '/collectes/' + idCollecte).pipe(
            map((res: any) => res)
        );
    }

    addCollecte(collecte: Collecte): Observable<Collecte> {
        return this.http.post(this.authUrl + '/collectes/me', collecte).pipe(
            map((newCollecte: any) => newCollecte)
        );
    }

    editCollecte(idCollecte: string, collecte: Collecte): Observable<Collecte> {
        return this.http.put(this.authUrl + '/collectes/' + idCollecte, collecte).pipe(
            map((newCollecte: any) => newCollecte)
        );
    }

    deleteCollecte(idCollecte: string): Observable<void> {
        return this.http.delete(`${this.authUrl}/collectes/${idCollecte}`).pipe(
            map(() => {
                console.log('Type de bouteille supprimé');
            })
        )
    }
}
