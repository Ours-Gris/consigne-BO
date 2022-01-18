import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {AuthService} from "../shared/services/auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {News} from "./data/News";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

    private authUrl = environment.api_base_url;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {
    }

    countAllNews(filter?: string): Observable<number> {
        let params = new HttpParams();
        if (filter) {
            params = params.set('_contains', filter);
        }
        const options = {
            params
        };
        return this.http.get(this.authUrl + '/news/count', options).pipe(
            map((res: any) => res)
        );
    }

    getNews(filter?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<News[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'createdAt')
            .set('_direction', sortDirection ? sortDirection : 'ASC')
            .set('_start', pageNumber && pageSize ? (pageNumber * pageSize).toString() : '0')
            .set('_limit', pageSize ? pageSize.toString() : '10');
        if (filter) {
            params = params.set('_contains', filter);
        }
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/news', options).pipe(
            map((res: any) => res)
        );
    }

    getOneNews(idNews: string): Observable<News> {
        return this.http.get(this.authUrl + '/news/' + idNews).pipe(
            map((res: any) => res)
        );
    }

    makeFormData(news: News): FormData {
        const formData = new FormData();
        formData.append('title', news.title);
        formData.append('subtitle', news.subtitle);
        formData.append('content', news.content);
        formData.append('link', news.link);
        formData.append('img_news', news.img_news);
        // For delete old img
        if (news.img_name) {
            formData.append('img_name', news.img_name);
        }
        return formData
    }

    addNews(news: News): Observable<News> {
        return this.http.post(this.authUrl + '/news', this.makeFormData(news)).pipe(
            map((newNews: any) => newNews)
        );
    }

    editNews(idNews: string, news: News): Observable<News> {
        return this.http.put(this.authUrl + '/news/' + idNews, this.makeFormData(news)).pipe(
            map((newNews: any) => newNews)
        );
    }

    deleteNews(idNews: string): Observable<void> {
        return this.http.delete(`${this.authUrl}/news/${idNews}`).pipe(
            map(() => {
                console.log('Type de bouteille supprimé');
            })
        )
    }
}
