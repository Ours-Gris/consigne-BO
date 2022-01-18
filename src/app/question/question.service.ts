import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {AuthService} from "../shared/services/auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Question} from "./data/Question";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
    private authUrl = environment.api_base_url;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {
    }

    countAllQuestions(filter?: string): Observable<number> {
        let params = new HttpParams();
        if (filter) {
            params = params.set('Nom_contains', filter);
        }
        const options = {
            params
        };
        return this.http.get(this.authUrl + '/faq/count', options).pipe(
            map((res: any) => res)
        );
    }

    getQuestions(filter?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Question[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'createdAt')
            .set('_direction', sortDirection ? sortDirection : 'ASC')
            .set('_start', pageNumber && pageSize ? (pageNumber * pageSize).toString() : '0')
            .set('_limit', pageSize ? pageSize.toString() : '10');
        if (filter) {
            params = params.set('name_contains', filter);
        }
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/faq', options).pipe(
            map((res: any) => res)
        );
    }

    getOneQuestion(idQuestion: string): Observable<Question> {
        return this.http.get(this.authUrl + '/faq/' + idQuestion).pipe(
            map((res: any) => res)
        );
    }

    addQuestion(question: Question): Observable<Question> {
        return this.http.post(this.authUrl + '/faq', question).pipe(
            map((newQuestion: any) => newQuestion)
        );
    }

    editQuestion(idQuestion: string, question: Question): Observable<Question> {
        return this.http.put(this.authUrl + '/faq/' + idQuestion, question).pipe(
            map((newQuestion: any) => newQuestion)
        );
    }

    deleteQuestion(idQuestion: string): Observable<void> {
        return this.http.delete(`${this.authUrl}/faq/${idQuestion}`).pipe(
            map(() => {
                console.log('Type de bouteille supprimé');
            })
        )
    }
}
