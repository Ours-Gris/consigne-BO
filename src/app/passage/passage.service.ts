import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {AuthService} from "../shared/services/auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Passage} from "./data/Passage";

@Injectable({
    providedIn: 'root'
})
export class PassageService {

    private authUrl = environment.api_base_url;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {
    }

    countWaitingPassages(): Observable<number> {
        return this.http.get(this.authUrl + '/passages/waiting/count').pipe(
            map((res: any) => res)
        );
    }

    countUserPassages(idUser: string): Observable<number> {
        return this.http.get(this.authUrl + '/passages/count/' + idUser).pipe(
            map((res: any) => res)
        );
    }

    getUserPassages(idUser: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Passage[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'createdAt')
            .set('_direction', sortDirection ? sortDirection : 'DESC')
            .set('_start', pageNumber && pageSize ? (pageNumber * pageSize).toString() : '0')
            .set('_limit', pageSize ? pageSize.toString() : '5');
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/passages/user/' + idUser, options).pipe(
            map((res: any) => res)
        );
    }

    getWaitingPassages(filter?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Passage[]> {
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

        return this.http.get(this.authUrl + '/passages/waiting', options).pipe(
            map((res: any) => res)
        );
    }

    getPassagesExport(): Observable<Passage[]> {
        return this.http.get(this.authUrl + '/passages/export').pipe(
            map((res: any) => res)
        );
    }

    getOnePassage(idPassage: string): Observable<Passage> {
        return this.http.get(this.authUrl + '/passages/' + idPassage).pipe(
            map((res: any) => res)
        );
    }

    addPassage(passage: Passage): Observable<Passage> {
        return this.http.post(this.authUrl + '/passages/me', passage).pipe(
            map((newPassage: any) => newPassage)
        );
    }

    editPassage(idPassage: string, passage: Passage): Observable<Passage> {
        return this.http.put(this.authUrl + '/passages/' + idPassage, passage).pipe(
            map((newPassage: any) => newPassage)
        );
    }

    deletePassage(idPassage: string): Observable<void> {
        return this.http.delete(`${this.authUrl}/passages/${idPassage}`).pipe(
            map(() => {
                console.log('Type de bouteille supprimé');
            })
        )
    }
}
