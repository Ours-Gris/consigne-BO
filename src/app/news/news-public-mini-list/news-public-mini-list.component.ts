import {Component, OnInit} from '@angular/core';
import {News} from "../data/News";
import {NewsService} from "../news.service";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-news-public-mini-list',
    templateUrl: './news-public-mini-list.component.html',
    styleUrls: ['./news-public-mini-list.component.css']
})
export class NewsPublicMiniListComponent implements OnInit {
    newsList: News[] = [];
    authUrl = environment.api_base_url;

    constructor(
        private newsService: NewsService,
    ) {
    }

    ngOnInit(): void {
        this.getNews('', 0, 'createdAt', 'DESC', 3)
    }

    getNews(filter?: string, startUser: number = 0, sortBy: string = 'createdAt', sortDirection: string = 'DESC', nbrUsers: number = 20) {
        this.newsService.getNews(filter, sortBy, sortDirection, startUser, nbrUsers).subscribe(
            (news) => {
                this.newsList.push(...news)
            },
            error => {
                console.error(error)
            }
        )
    }
}
