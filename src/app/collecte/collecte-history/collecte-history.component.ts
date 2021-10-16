import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CollectesDataSource} from "../data/collectes-data-source";
import {CollecteStatus} from "../data/collecte.status";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CollecteService} from "../collecte.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {merge} from "rxjs";
import {tap} from "rxjs/operators";
import Swal from "sweetalert2";
import {Collecte} from "../data/Collecte";

@Component({
    selector: 'app-collecte-history',
    templateUrl: './collecte-history.component.html',
    styleUrls: ['./collecte-history.component.css']
})
export class CollecteHistoryComponent implements OnInit, AfterViewInit {

    @Input() idUser!: string | null;
    collectes!: CollectesDataSource;
    displayedColumns: string[] = ['createdAt', 'status', 'actions'];
    totalCollectes: number = 0;
    collecteStatus = CollecteStatus;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('input') input!: ElementRef;

    constructor(
        private collecteService: CollecteService,
        private toastr: ToastrService,
        public router: Router,
        public route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        if (this.idUser) {
            this.collectes = new CollectesDataSource(this.collecteService);
            this.collectes.loadUserCollectes(this.idUser);
        }
    }

    ngAfterViewInit(): void {
        this.countUserCollectes();
        // server-side search
        // fromEvent(this.input.nativeElement, 'keyup').pipe(
        //     debounceTime(500),
        //     distinctUntilChanged(),
        //     tap(() => {
        //         this.paginator.pageIndex = 0;
        //         this.loadCollectesPage();
        //         this.countUserCollectes()
        //     })
        // ).subscribe();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => {
                this.loadCollectesPage();
            })
        ).subscribe()
    }

    addCollecteAlmustFull() {
        if (this.idUser) {
            let newCollecte: Collecte = {
                user: this.idUser,
                status: CollecteStatus.ALMOST_FULL
            }
            this.collecteService.addCollecte(newCollecte).subscribe(
                () => {
                    this.loadCollectesPage();
                    this.countUserCollectes();
                }
            )
        }
    }

    addCollecteFull() {
        if (this.idUser) {
            let newCollecte: Collecte = {
                user: this.idUser,
                status: CollecteStatus.FULL
            }
            this.collecteService.addCollecte(newCollecte).subscribe(
                () => {
                    this.loadCollectesPage();
                    this.countUserCollectes();
                }
            )
        }
    }

    loadCollectesPage(): void {
        if (this.idUser) {
            this.collectes.loadUserCollectes(
                this.idUser,
                this.sort.active,
                this.sort.direction,
                this.paginator.pageIndex,
                this.paginator.pageSize);
        }
    }

    countUserCollectes(): void {
        if (this.idUser) {
            this.collecteService.countUserCollectes(this.idUser).subscribe(
                (totalCollectes: number) => {
                    this.totalCollectes = totalCollectes;
                }
            )
        }
    }

    editCollecte(idCollecte: string): void {
        //TODO modifier pour adapter
        this.router.navigate(['collecte', 'edit', idCollecte]).then();
    }

    deleteCollecte(idCollecte: string): void {
        // TODO Uniquement pour un admin
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
                            this.countUserCollectes();
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
