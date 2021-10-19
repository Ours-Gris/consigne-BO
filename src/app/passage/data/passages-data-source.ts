import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {PassageService} from '../passage.service';
import {catchError, finalize} from 'rxjs/operators';
import {Passage} from "./Passage";

export class PassagesDataSource implements DataSource<Passage> {
    private passagesSubject = new BehaviorSubject<Passage[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private passageService: PassageService
    ) {
    }

    connect(collectionViewer: CollectionViewer): Observable<Passage[]> {
        return this.passagesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.passagesSubject.complete();
        this.loadingSubject.complete();
    }

    loadUserPassages(idUser: string, sortBy?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): void {
        this.loadingSubject.next(true);
        this.passageService.getUserPassages(idUser, sortBy, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe((passages: Passage[]) => this.passagesSubject.next(passages));
    }

    loadWaitingPassages(filter?: string, sortBy?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): void {
        this.loadingSubject.next(true);
        this.passageService.getWaitingPassages(filter, sortBy, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe((passages: Passage[]) => this.passagesSubject.next(passages));
    }
}
