import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MaterialsDataSource} from "../data/materials-data-source";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MaterialService} from "../services/material.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {Material} from "../data/Material";
import Swal from "sweetalert2";
import {AngularCsv} from 'angular-csv-ext/dist/Angular-csv';

@Component({
    selector: 'app-material-list',
    templateUrl: './material-list.component.html',
    styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit {
    materials!: MaterialsDataSource;
    displayedColumns: string[] = ['name', 'code', 'price', 'internal_stock', 'actions'];
    totalMaterials: number = 0;

    exportCsvOptions = {
        fieldSeparator: ';',
        useHeader: true,
        headers: ['name', 'description', 'code', 'price', 'internal_stock']
    }

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('input') input!: ElementRef;

    constructor(
        private materialService: MaterialService,
        private toastr: ToastrService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.materials = new MaterialsDataSource(this.materialService);
        this.materials.loadMaterials();
    }

    ngAfterViewInit(): void {
        this.countAllMaterials();

        // server-side search
        fromEvent(this.input.nativeElement, 'keyup').pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadMaterialsPage();
                this.countAllMaterials();
            })
        ).subscribe();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => {
                this.loadMaterialsPage();
            })
        ).subscribe();
    }

    loadMaterialsPage(): void {
        this.materials.loadMaterials(
            this.input.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    countAllMaterials(): void {
        this.materialService.countAllMaterials(
            this.input.nativeElement.value
        ).subscribe(
            (totalMaterials: number) => {
                this.totalMaterials = totalMaterials;
            }
        );
    }

    editMaterial(idMaterial: string): void {
        this.router.navigate(['material', 'edit', idMaterial]).then();
    }

    exportAllMaterials() {
        this.materialService.getMaterialsExport().subscribe(
            (materials: Material[]) => {
                new AngularCsv(materials, 'export', this.exportCsvOptions)
            }
        );
    }

    deleteMaterial(idMaterial: string): void {
        Swal.fire({
            title: `Supprimer ce matériel`,
            icon: 'warning',
            text: 'Êtes-vous sûr de vouloir supprimer ce type de matériel ?',
            showConfirmButton: true,
            confirmButtonText: 'Supprimer',
            showCancelButton: true,
            cancelButtonText: 'Annuler'
        }).then(
            (result) => {
                if (result.isConfirmed) {
                    this.materialService.deleteMaterial(idMaterial).subscribe({
                        next: () => {
                            this.loadMaterialsPage();
                            this.countAllMaterials();
                            this.toastr.success('Le type de matériel a été supprimé', 'Supprimer');
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
