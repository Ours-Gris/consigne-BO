import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {OrderService} from '../order.service';
import {catchError, finalize} from 'rxjs/operators';
import {Order} from "./Order";

export class OrderDataSource implements DataSource<Order> {
    private ordersSubject = new BehaviorSubject<Order[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private orderService: OrderService
    ) {
    }

    connect(collectionViewer: CollectionViewer): Observable<Order[]> {
        return this.ordersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.ordersSubject.complete();
        this.loadingSubject.complete();
    }

    loadUserOrders(idUser: string, sortBy?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): void {
        this.loadingSubject.next(true);
        this.orderService.getUserOrders(idUser, sortBy, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe((userOrders: Order[]) => this.ordersSubject.next(userOrders));
    }

    loadMyOrders(sortBy?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): void {
        this.loadingSubject.next(true);
        this.orderService.getMyOrders(sortBy, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe((userMaterial: Order[]) => this.ordersSubject.next(userMaterial));
    }

    loadAllOrders(sortBy?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): void {
        this.loadingSubject.next(true);
        this.orderService.getAllOrders(sortBy, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe((userMaterial: Order[]) => this.ordersSubject.next(userMaterial));
    }
}
