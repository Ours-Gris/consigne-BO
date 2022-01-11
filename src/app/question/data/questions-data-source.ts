import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {QuestionService} from '../question.service';
import {catchError, finalize} from 'rxjs/operators';
import {Question} from "./Question";

export class QuestionsDataSource implements DataSource<Question> {
    private questionsSubject = new BehaviorSubject<Question[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(
        private questionService: QuestionService
    ) {
    }

    connect(collectionViewer: CollectionViewer): Observable<Question[]> {
        return this.questionsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.questionsSubject.complete();
        this.loadingSubject.complete();
    }

    loadQuestions(filter?: string, sortBy?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): void {
        this.loadingSubject.next(true);
        this.questionService.getQuestions(filter, sortBy, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            ).subscribe((questions: Question[]) => this.questionsSubject.next(questions));
    }
}
