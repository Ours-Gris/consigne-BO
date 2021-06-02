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
    private currentUserSubject!: BehaviorSubject<User | null>;
    public currentUser!: Observable<User | null>;

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

    isLoggedIn(): boolean {
        return this.currentUserValue?.token !== null;
    }

    login(model: any): Observable<any> {
        return this.http.post<User>(this.authUrl + 'auth/login', model).pipe(
            map(
                (user: User) => {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
            )
        );
    }

    register(model: any): Observable<any> {
        return this.http.post(this.authUrl + 'auth/signup', model).pipe(
            map(
                (response: any) => {
                    const user = response.user;
                    if (response.jwt) {
                        localStorage.setItem('user', JSON.stringify(user));
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
