import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {BottleService} from '../services/bottle.service';
import {catchError, finalize} from 'rxjs/operators';
import {Bottle} from "./Bottle";

export class BottlesDataSource implements DataSource<Bottle> {
    private bottlesSubject = new BehaviorSubject<Bottle[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private bottleService: BottleService
    ) {
    }

    connect(collectionViewer: CollectionViewer): Observable<Bottle[]> {
        return this.bottlesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.bottlesSubject.complete();
        this.loadingSubject.complete();
    }

    loadBottles(filter?: string, sortBy?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): void {
        this.loadingSubject.next(true);
        this.bottleService.getBottles(filter, sortBy, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe((bottles: Bottle[]) => this.bottlesSubject.next(bottles));
    }
}
