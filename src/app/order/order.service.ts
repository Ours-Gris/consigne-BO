import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {AuthService} from "../shared/services/auth.service";
import {Order} from "./data/Order";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private authUrl = environment.api_base_url;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {
    }

    getUserOrders(idUser: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Order[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'createdAt')
            .set('_direction', sortDirection ? sortDirection : 'DESC')
            .set('_start', pageNumber && pageSize ? (pageNumber * pageSize).toString() : '0')
            .set('_limit', pageSize ? pageSize.toString() : '5');
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/orders/user/' + idUser, options).pipe(
            map((res: any) => res)
        );
    }

    getMyOrders(sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Order[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'createdAt')
            .set('_direction', sortDirection ? sortDirection : 'DESC')
            .set('_start', pageNumber && pageSize ? (pageNumber * pageSize).toString() : '0')
            .set('_limit', pageSize ? pageSize.toString() : '5');
        const options = {
            params
        };

        return this.http.get(`${this.authUrl}/orders/me`, options).pipe(
            map((res: any) => res)
        );
    }



    countUserOrders(idUser: string): Observable<number> {
        return this.http.get(`${this.authUrl}/orders/count/user/${idUser}`).pipe(
            map((res: any) => res)
        );
    }

    countMyOrders(): Observable<number> {
        return this.http.get(`${this.authUrl}/orders/count/me`).pipe(
            map((res: any) => res)
        );
    }

    addOrder(order: Partial<Order>): Observable<Order> {
        return this.http.post(`${this.authUrl}/orders`, order).pipe(
            map((newPassage: any) => newPassage)
        );
    }

    editOrder(idOrder: string, order: Partial<Order>): Observable<Order> {
        return this.http.put(`${this.authUrl}/orders/${idOrder}`, order).pipe(
            map((newOrder: any) => newOrder)
        );
    }

    deleteOrder(idOrder: string): Observable<void> {
        return this.http.delete(`${this.authUrl}/orders/${idOrder}`).pipe(
            map(() => {
                console.log('Type de bouteille supprimé');
            })
        )
    }
}
