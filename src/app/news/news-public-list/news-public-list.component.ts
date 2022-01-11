import {Component, OnInit} from '@angular/core';
import {News} from "../data/News";
import {environment} from "../../../environments/environment";
import {NewsService} from "../news.service";

@Component({
    selector: 'app-news-public-list',
    templateUrl: './news-public-list.component.html',
    styleUrls: ['./news-public-list.component.css']
})
export class NewsPublicListComponent implements OnInit {
    newsList: News[] = [];
    authUrl = environment.api_base_url;

    constructor(
        private newsService: NewsService,
    ) {
    }

    ngOnInit(): void {
        this.getNews()
    }

    getNews(filter?: string, startUser: number = 0, sortBy: string = 'createdAt', sortDirection: string = 'DESC', nbrUsers: number = 50) {
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
