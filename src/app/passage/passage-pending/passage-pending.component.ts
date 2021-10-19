import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PassagesDataSource} from "../data/passages-data-source";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PassageService} from "../passage.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {merge} from "rxjs";
import {tap} from "rxjs/operators";
import {Passage} from "../data/Passage";
import {AngularCsv} from 'angular-csv-ext/dist/Angular-csv';
import Swal from "sweetalert2";

@Component({
  selector: 'app-passage-pending',
  templateUrl: './passage-pending.component.html',
  styleUrls: ['./passage-pending.component.css']
})
export class PassagePendingComponent implements OnInit {
    passages!: PassagesDataSource;
    displayedColumns: string[] = ['company', 'status', 'actions'];
    totalPassages: number = 0;

    exportCsvOptions = {
        fieldSeparator: ';',
        useHeader: true,
        headers: ['name', 'description', 'code', 'price', 'internal_stock']
    }

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('input') input!: ElementRef;

    constructor(
        private passageService: PassageService,
        private toastr: ToastrService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.passages = new PassagesDataSource(this.passageService);
        this.passages.loadWaitingPassages();
    }

    ngAfterViewInit(): void {
        this.countWaitingPassages();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => {
                this.loadPassagesPage();
            })
        ).subscribe();
    }

    loadPassagesPage(): void {
        this.passages.loadWaitingPassages(
            this.input.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    countWaitingPassages(): void {
        this.passageService.countWaitingPassages().subscribe(
            (totalPassages: number) => {
                this.totalPassages = totalPassages;
            }
        );
    }

    editPassage(idPassage: string): void {
        //TODO modifier pour adapter
        this.router.navigate(['passage', 'edit', idPassage]).then();
    }

    exportAllPassages() {
        this.passageService.getPassagesExport().subscribe(
            (passages: Passage[]) => {
                new AngularCsv(passages, 'export', this.exportCsvOptions)
            }
        );
    }

    deletePassage(idPassage: string): void {
        Swal.fire({
            title: `Supprimer ce passage`,
            icon: 'warning',
            text: 'Êtes-vous sûr de vouloir supprimer ce passage ?',
            showConfirmButton: true,
            confirmButtonText: 'Supprimer',
            showCancelButton: true,
            cancelButtonText: 'Annuler'
        }).then(
            (result) => {
                if (result.isConfirmed) {
                    this.passageService.deletePassage(idPassage).subscribe({
                        next: () => {
                            this.loadPassagesPage();
                            this.countWaitingPassages();
                            this.toastr.success('La passage a été supprimé', 'Supprimer');
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
