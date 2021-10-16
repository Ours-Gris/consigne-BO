import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {CollecteService} from '../collecte.service';
import {catchError, finalize} from 'rxjs/operators';
import {Collecte} from "./Collecte";

export class CollectesDataSource implements DataSource<Collecte> {
    private collectesSubject = new BehaviorSubject<Collecte[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private collecteService: CollecteService
    ) {
    }

    connect(collectionViewer: CollectionViewer): Observable<Collecte[]> {
        return this.collectesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.collectesSubject.complete();
        this.loadingSubject.complete();
    }

    loadUserCollectes(idUser: string, sortBy?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): void {
        this.loadingSubject.next(true);
        this.collecteService.getUserCollectes(idUser, sortBy, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe((collectes: Collecte[]) => this.collectesSubject.next(collectes));
    }

    loadWaitingCollectes(filter?: string, sortBy?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): void {
        this.loadingSubject.next(true);
        this.collecteService.getWaitingCollectes(filter, sortBy, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe((collectes: Collecte[]) => this.collectesSubject.next(collectes));
    }
}
