import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    private authUrl = environment.api_base_url;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {}

    getMap(): void {
    }

}
