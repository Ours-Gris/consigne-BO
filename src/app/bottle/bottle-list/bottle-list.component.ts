import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {BottleService} from "../services/bottle.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BottlesDataSource} from "../data/bottles-data-source";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
    selector: 'app-bottle-list',
    templateUrl: './bottle-list.component.html',
    styleUrls: ['./bottle-list.component.css']
})
export class BottleListComponent implements OnInit, AfterViewInit {
    bottles!: BottlesDataSource;
    displayedColumns: string[] = ['name', 'code', 'actions'];
    totalBottles: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('input') input!: ElementRef;

    constructor(
        private bottleService: BottleService,
        private toastr: ToastrService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.bottles = new BottlesDataSource(this.bottleService);
        this.bottles.loadBottles();
    }

    ngAfterViewInit(): void {
        this.countAllBottles();

        // server-side search
        fromEvent(this.input.nativeElement, 'keyup').pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadBottlesPage();
                this.countAllBottles();
            })
        ).subscribe();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => {
                this.loadBottlesPage();
            })
        ).subscribe();
    }

    loadBottlesPage(): void {
        this.bottles.loadBottles(
            this.input.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    countAllBottles(): void {
        this.bottleService.countAllBottles(
            this.input.nativeElement.value
        ).subscribe(
            (totalBottles: number) => {
                this.totalBottles = totalBottles;
            }
        );
    }

    editBottle(idBottle: string): void {
        this.router.navigate(['bottle', 'edit', idBottle]).then();
    }

    deleteBottle(idBottle: string): void {
        Swal.fire({
            title: `Supprimer le type de bouteille`,
            icon: 'warning',
            text: 'Êtes-vous sûr de vouloir supprimer ce type de bouteille ?',
            showConfirmButton: true,
            confirmButtonText: 'Supprimer',
            showCancelButton: true,
            cancelButtonText: 'Annuler'
        }).then(
            (result) => {
                if (result.isConfirmed) {
                    this.bottleService.deleteBottle(idBottle).subscribe({
                        next: () => {
                            this.loadBottlesPage();
                            this.toastr.success('Le type de bouteille a été supprimé', 'Supprimer');
                        },
                        error: error => {
                            console.error(error);
                            if (Array.isArray(error)) {
                                error.map((err: string) => {
                                    this.toastr.error(err, 'Error !');
                                })
                            } else {
                                this.toastr.error(error, 'Error !');
                            }
                        }
                    })
                }
            }
        )
    }
}
