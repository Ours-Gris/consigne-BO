import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../../models/User';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authUrl = environment.api_base_url;
    public currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    constructor(
        private http: HttpClient
    ) {
        let user = localStorage.getItem('user');
        this.currentUserSubject = new BehaviorSubject<User | null>(user ? JSON.parse(user) : '');
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    public get currentUserToken(): string {
        let token = localStorage.getItem('token');
        return token ? JSON.parse(token) : '';
    }

    isLoggedIn(): boolean {
        // un token expiré donne true attention
        return this.currentUserToken !== null;
    }

    login(model: any): Observable<any> {
        return this.http.post(this.authUrl + 'auth/login', model).pipe(
            map(
                (response: any) => {
                    if (response.token) {
                        localStorage.setItem('token', JSON.stringify(response.token));
                    }
                    localStorage.setItem('user', JSON.stringify(response.user));
                    this.currentUserSubject.next(response.user);
                    return response.user;
                }
            )
        );
    }

    register(model: any): Observable<any> {
        const data = model;
        return this.http.post(this.authUrl + 'auth/signup', data).pipe(
            map(
                (response: any) => {
                    const user = response.user;
                    console.log(user);
                    if (response.jwt) {
                        localStorage.setItem('token', response.jwt);
                    }
                }
            )
        );
    }

    // remove user from local storage and set current user to null
    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }
}
