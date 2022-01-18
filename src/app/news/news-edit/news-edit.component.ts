import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {
    idNews!: string | null;

    constructor(
        public route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.idNews = this.route.snapshot.paramMap.get('idNews')
    }

}
