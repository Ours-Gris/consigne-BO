import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {NewsService} from '../news.service';
import {catchError, finalize} from 'rxjs/operators';
import {News} from "./News";

export class NewsDataSource implements DataSource<News> {
    private questionsSubject = new BehaviorSubject<News[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private newsService: NewsService
    ) {
    }

    connect(collectionViewer: CollectionViewer): Observable<News[]> {
        return this.questionsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.questionsSubject.complete();
        this.loadingSubject.complete();
    }

    loadNews(filter?: string, sortBy?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): void {
        this.loadingSubject.next(true);
        this.newsService.getNews(filter, sortBy, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe((questions: News[]) => this.questionsSubject.next(questions));
    }
}
