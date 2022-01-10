import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../shared/services/auth.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Address} from "../../user/data/Address";

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

    // getGeocode(address: Address): Address {
    //
    // }


}
