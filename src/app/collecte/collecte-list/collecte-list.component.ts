import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CollectesDataSource} from "../data/collectes-data-source";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CollecteService} from "../collecte.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {Collecte} from "../data/Collecte";
import {AngularCsv} from 'angular-csv-ext/dist/Angular-csv';
import {CollecteStatus} from "../data/collecte.status";
import Swal from "sweetalert2";

@Component({
    selector: 'app-collecte-list',
    templateUrl: './collecte-list.component.html',
    styleUrls: ['./collecte-list.component.css']
})
export class CollecteListComponent implements OnInit, AfterViewInit {
    collectes!: CollectesDataSource;
    displayedColumns: string[] = ['company', 'status', 'actions'];
    totalCollectes: number = 0;
    collecteStatus = CollecteStatus;

    exportCsvOptions = {
        fieldSeparator: ';',
        useHeader: true,
        headers: ['name', 'description', 'code', 'price', 'internal_stock']
    }

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('input') input!: ElementRef;

    constructor(
        private collecteService: CollecteService,
        private toastr: ToastrService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.collectes = new CollectesDataSource(this.collecteService);
        this.collectes.loadWaitingCollectes();
    }

    ngAfterViewInit(): void {
        this.countWaitingCollectes();

        // server-side search
        fromEvent(this.input.nativeElement, 'keyup').pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadCollectesPage();
                this.countWaitingCollectes();
            })
        ).subscribe();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => {
                this.loadCollectesPage();
            })
        ).subscribe();
    }

    loadCollectesPage(): void {
        this.collectes.loadWaitingCollectes(
            this.input.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    countWaitingCollectes(): void {
        this.collecteService.countWaitingCollectes(
            this.input.nativeElement.value
        ).subscribe(
            (totalCollectes: number) => {
                this.totalCollectes = totalCollectes;
            }
        );
    }

    editCollecte(idCollecte: string): void {
        //TODO modifier pour adapter
        this.router.navigate(['collecte', 'edit', idCollecte]).then();
    }

    exportAllCollectes() {
        this.collecteService.getCollectesExport().subscribe(
            (collectes: Collecte[]) => {
                new AngularCsv(collectes, 'export', this.exportCsvOptions)
            }
        );
    }

    deleteCollecte(idCollecte: string): void {
        Swal.fire({
            title: `Supprimer cette collecte`,
            icon: 'warning',
            text: 'Êtes-vous sûr de vouloir supprimer cette collecte ?',
            showConfirmButton: true,
            confirmButtonText: 'Supprimer',
            showCancelButton: true,
            cancelButtonText: 'Annuler'
        }).then(
            (result) => {
                if (result.isConfirmed) {
                    this.collecteService.deleteCollecte(idCollecte).subscribe({
                        next: () => {
                            this.loadCollectesPage();
                            this.countWaitingCollectes();
                            this.toastr.success('La collecte a été supprimé', 'Supprimer');
                        },
                        error: this.errorSubmit
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
