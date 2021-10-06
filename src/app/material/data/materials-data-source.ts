import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {MaterialService} from '../services/material.service';
import {catchError, finalize} from 'rxjs/operators';
import {Material} from "./Material";

export class MaterialsDataSource implements DataSource<Material> {
    private materialsSubject = new BehaviorSubject<Material[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private materialService: MaterialService
    ) {
    }

    connect(collectionViewer: CollectionViewer): Observable<Material[]> {
        return this.materialsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.materialsSubject.complete();
        this.loadingSubject.complete();
    }

    loadMaterials(filter?: string, sortBy?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): void {
        this.loadingSubject.next(true);
        this.materialService.getMaterials(filter, sortBy, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe((materials: Material[]) => this.materialsSubject.next(materials));
    }
}
