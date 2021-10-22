import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PassagesDataSource} from "../data/passages-data-source";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PassageService} from "../passage.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {CollecteStatus} from "../../user/data/collecte.status";
import {UserService} from "../../user/services/user.service";
import {User} from "../../user/data/User";
import {merge} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
    selector: 'app-passage-user-history',
    templateUrl: './passage-user-history.component.html',
    styleUrls: ['./passage-user-history.component.css']
})
export class PassageUserHistoryComponent implements OnInit, AfterViewInit {
    @Input() user!: User;
    @Input() home: boolean = false;
    collecteStatus = CollecteStatus;
    passages!: PassagesDataSource;
    userDisplayedColumns: string[] = ['createdAt', 'bottles_collected'];
    adminDisplayedColumns: string[] = ['createdAt', 'bottles_collected', 'actions'];
    totalPassages: number = 0;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('input') input!: ElementRef;

    constructor(
        private passageService: PassageService,
        private userService: UserService,
        private toastr: ToastrService,
        public router: Router,
        public route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        if (this.user) {
            this.passages = new PassagesDataSource(this.passageService);
            if (this.home) {
                this.passages.loadMyPassages()
            } else {
                this.passages.loadUserPassages(this.user.id)
            }
        }
    }

    ngAfterViewInit(): void {
        this.countUserPassages();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => {
                this.loadPassagesPage()
            })
        ).subscribe()
    }

    editCollecteStatus(newCollecteStatus: CollecteStatus) {
        if (this.home) {
            this.userService.editMe({collecte_status: newCollecteStatus}).subscribe({
                next: () => {
                    this.user.collecte_status = newCollecteStatus;
                    this.toastr.success('La collecte a changé de statut', 'Collecte');
                },
                error: this.errorSubmit
            })
        } else {
            this.userService.editUser(this.user.id, {collecte_status: newCollecteStatus}).subscribe({
                next: () => {
                    this.user.collecte_status = newCollecteStatus;
                    this.toastr.success('La collecte a changé de statut', 'Collecte');
                },
                error: this.errorSubmit
            })
        }
    }

    loadPassagesPage(): void {
        if (this.home) {
            this.passages.loadMyPassages(
                this.sort.active,
                this.sort.direction,
                this.paginator.pageIndex,
                this.paginator.pageSize);
        } else {
            this.passages.loadUserPassages(
                this.user.id,
                this.sort.active,
                this.sort.direction,
                this.paginator.pageIndex,
                this.paginator.pageSize);
        }
    }

    countUserPassages(): void {
        if (this.home) {
            this.passageService.countMyPassages().subscribe(
                (totalPassages: number) => {
                    this.totalPassages = totalPassages;
                }
            )
        } else {
            this.passageService.countUserPassages(this.user.id).subscribe(
                (totalPassages: number) => {
                    this.totalPassages = totalPassages;
                }
            )
        }
    }

    editPassage(idPassage: string): void {
        Swal.fire({
            title: `Modifier le passage`,
            icon: 'question',
            input: 'number',
            inputLabel: 'Combient de bouteilles ont été collectées ?',
            showConfirmButton: true,
            cancelButtonText: 'Annuler'
        }).then(
            response => {
                if (response.isConfirmed && response.value && response.value != 0) {
                    this.passageService.editPassage(idPassage, {
                        bottles_collected: Math.abs(response.value)
                    }).subscribe({
                        next: () => {
                            this.countUserPassages();
                            this.passages.loadUserPassages(this.user.id);
                            this.toastr.success('Le passage a été modifié', 'Modifier');
                        },
                        error: this.errorSubmit
                    })
                }
            }
        )
    }

    addPassage() {
        Swal.fire({
            title: `Ajouter un passage`,
            icon: 'question',
            input: 'number',
            inputLabel: 'Combient de bouteilles ont été collectées ?',
            showConfirmButton: true,
            cancelButtonText: 'Annuler'
        }).then(response => {
            if (response.isConfirmed && response.value && response.value != 0) {
                this.passageService.addPassage({
                    bottles_collected: Math.abs(response.value),
                    user: this.user.id
                }).subscribe({
                    next: () => {
                        this.countUserPassages();
                        this.passages.loadUserPassages(this.user.id);
                        this.toastr.success('Le passage a été ajouté', 'Ajouter');
                    },
                    error: this.errorSubmit
                })
            }
        })
    }

    deletePassage(idPassage: string): void {
        // TODO Uniquement pour un admin
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
                            this.countUserPassages();
                            this.passages.loadUserPassages(this.user.id);
                            this.toastr.success('Le passage a été supprimé', 'Supprimer');
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
