import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NewsDataSource} from "../data/news-data-source";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NewsService} from "../news.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
    newsList!: NewsDataSource;
    displayedColumns: string[] = ['title', 'createdAt', 'actions'];
    totalNews: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('input') input!: ElementRef;

    constructor(
        private newsService: NewsService,
        private toastr: ToastrService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.newsList = new NewsDataSource(this.newsService);
        this.newsList.loadNews();
    }

    ngAfterViewInit(): void {
        this.countAllNews();

        // server-side search
        fromEvent(this.input.nativeElement, 'keyup').pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadNewsPage();
                this.countAllNews();
            })
        ).subscribe();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => {
                this.loadNewsPage();
            })
        ).subscribe();
    }

    loadNewsPage(): void {
        this.newsList.loadNews(
            this.input.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    countAllNews(): void {
        this.newsService.countAllNews(
            this.input.nativeElement.value
        ).subscribe(
            (totalNews: number) => {
                this.totalNews = totalNews;
            }
        );
    }

    editNews(idNews: string): void {
        this.router.navigate(['news', 'edit', idNews]).then();
    }

    deleteNews(idNews: string): void {
        Swal.fire({
            title: `Supprimer cette actualité`,
            icon: 'warning',
            text: 'Êtes-vous sûr de vouloir supprimer cette actualité ?',
            showConfirmButton: true,
            confirmButtonText: 'Supprimer',
            showCancelButton: true,
            cancelButtonText: 'Annuler'
        }).then(
            (result) => {
                if (result.isConfirmed) {
                    this.newsService.deleteNews(idNews).subscribe({
                        next: () => {
                            this.loadNewsPage();
                            this.countAllNews();
                            this.toastr.success('L\'actualité a été supprimé', 'Supprimer');
                        },
                        error: (err) => {
                            this.errorSubmit(err)
                        }
                    })
                }
            }
        )
    }

    errorSubmit(error: string[] | string) {
        console.error(error);
        if (Array.isArray(error)) {
            error.map((err: string) => {
                this.toastr.error(err, 'Error !');
            })
        } else {
            this.toastr.error(error, 'Error !');
        }
    }
}
