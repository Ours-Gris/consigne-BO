import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private authUrl = environment.api_base_url;

    constructor(
        private http: HttpClient
    ) {
    }

    sandMessage(message: {name: string, email: string, message: string}) {
        return this.http.post(this.authUrl + '/message', message).pipe(
            map((res: any) => res)
        )
    }
}
