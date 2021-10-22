import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {map} from 'rxjs/operators';
import {User} from "../data/User";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private authUrl = environment.api_base_url;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {}

    getMe(): Observable<User> {
        return this.http.get(this.authUrl + '/users/me').pipe(
            map((res: any) => res)
        );
    }

    editMe(user: Partial<User>): Observable<User> {
        return this.http.put(this.authUrl + '/users/me', user).pipe(
            map((newUser: any) => newUser)
        );
    }

    countAllUsers(filter?: string): Observable<number> {
        let params = new HttpParams();
        if (filter) {
            params = params.set('Nom_contains', filter);
        }
        const options = {
            params
        };
        return this.http.get(this.authUrl + '/users/count', options).pipe(
            map((res: any) => res)
        );
    }

    countUsersWaitingPassage(filter?: string): Observable<number> {
        let params = new HttpParams();
        if (filter) {
            params = params.set('Nom_contains', filter);
        }
        const options = {
            params
        };
        return this.http.get(this.authUrl + '/users/waiting/count', options).pipe(
            map((res: any) => res)
        );
    }

    getUsers(filter?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<User[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'username')
            .set('_direction', sortDirection ? sortDirection : 'ASC')
            .set('_start', pageNumber && pageSize ? (pageNumber * pageSize).toString() : '0')
            .set('_limit', pageSize ? pageSize.toString() : '10');
        if (filter) {
            params = params.set('_contains', filter);
        }
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/users', options).pipe(
            map((res: any) => res)
        );
    }

    getUsersWaitingPassage(filter?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<User[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'collecte_status')
            .set('_direction', sortDirection ? sortDirection : 'DESC')
            .set('_start', pageNumber && pageSize ? (pageNumber * pageSize).toString() : '0')
            .set('_limit', pageSize ? pageSize.toString() : '10');
        if (filter) {
            params = params.set('_contains', filter);
        }
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/users/waiting', options).pipe(
            map((res: any) => res)
        );
    }

    getOneUser(idUser: string): Observable<User> {
        return this.http.get(this.authUrl + '/users/' + idUser).pipe(
            map((res: any) => res)
        );
    }

    getUsersExport(): Observable<User[]> {
        return this.http.get(this.authUrl + '/users/export').pipe(
            map((res: any) => res)
        );
    }

    addUser(user: User): Observable<User> {
        return this.http.post(this.authUrl + '/auth/add', user).pipe(
            map((newUser: any) => newUser)
        );
    }

    editUser(idUser: string, user: Partial<User>): Observable<User> {
        return this.http.put(this.authUrl + '/users/' + idUser, user).pipe(
            map((newUser: any) => newUser)
        );
    }

    deleteUser(idUser: string): Observable<void> {
        return this.http.delete(`${this.authUrl}/users/${idUser}`).pipe(
            map(() => {
                console.log('Utilisateur supprimé');
            })
        );
    }
}
