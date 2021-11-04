import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../../user/data/User';
import {Role} from "../../user/data/Role";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = environment.api_base_url;
    private currentUserSubject!: BehaviorSubject<User | null>;
    private token: string = '';
    public tokenKey: string = 'consigne-api';
    public currentUser!: Observable<User | null>;

    constructor(
        private _http: HttpClient
    ) {
        this.token = localStorage.getItem(this.tokenKey) || '';
        let user = null;
        if (this.token) {
            user = this.decodePayloadToken(this.token);

        }
        this.currentUserSubject = new BehaviorSubject<User | null>(user ? user : '');
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value
    }

    isLoggedIn(): boolean {
        return this.currentUserValue?.token !== null
    }

    login(model: any): Observable<any> {
        return this._http.post<User>(this.authUrl + '/auth/login', model).pipe(
            map(
                (response: any) => {
                    if (response.access_token) {
                        this.token = response.access_token;
                        const payload = this.decodePayloadToken(this.token);
                        localStorage.setItem(this.tokenKey, this.token);
                        this.currentUserSubject.next(payload)
                    }
                }
            )
        )
    }

    register(model: any): Observable<any> {
        return this._http.post(this.authUrl + '/auth/signup', model).pipe(
            map(
                (response: any) => {
                    if (response.access_token) {
                        this.token = response.access_token;
                        const payload = this.decodePayloadToken(this.token);
                        localStorage.setItem(this.tokenKey, this.token);
                        this.currentUserSubject.next(payload)
                    }
                }
            )
        )
    }

    // remove user from local storage and set current user to null
    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.currentUserSubject.next(null)
    }

    reset(email: string): Observable<any> {
        return this._http.post(this.authUrl + '/auth/reset', {email}).pipe(
            map(
                (response: any) => {
                    console.log(response)
                }
            )
        )
    }

    updatePassword(token: string, password: string) {
        return this._http.put(
            this.authUrl + '/users/me',
            {password},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).pipe(
            map(
                (response: any) => {
                    console.log(response)
                }
            )
        )
    }

    decodePayloadToken(token: string) {
        return JSON.parse(atob(token.split('.')[1]))
    }

    get isAdmin() {
        if (!this.token) {
            return false
        }
        const payload = this.decodePayloadToken(this.token);
        return payload.role === Role.ADMIN
    }

    sendWelcome(idUser: string): Observable<any> {
        return this._http.get(this.authUrl + '/auth/welcome/' + idUser).pipe(
            map(
                (response: any) => {
                    console.log(response)
                }
            )
        );
    }

    confirm(token: string): Observable<any> {
        return this._http.post(this.authUrl + '/auth/confirm', {token}).pipe(
            map(
                (response: any) => {
                    console.log(response)
                }
            )
        );
    }
}
