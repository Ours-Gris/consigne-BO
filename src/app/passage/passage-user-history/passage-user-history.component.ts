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
    displayedColumns: string[] = ['createdAt', 'status', 'actions'];
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
            // this.passages = new PassagesDataSource(this.passageService);
            // this.passages.loadUserPassages(this.user.id);
        }
    }

    ngAfterViewInit(): void {
        // this.countUserPassages();
        //
        // // reset the paginator after sorting
        // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        // merge(this.sort.sortChange, this.paginator.page).pipe(
        //     tap(() => {
        //         this.loadPassagesPage();
        //     })
        // ).subscribe()
    }

    editCollecteStatus(newCollecteStatus: CollecteStatus) {
        if (this.home) {
            this.userService.editMe({collecte_status: newCollecteStatus}).subscribe(
                () => {
                    this.user.collecte_status = newCollecteStatus;
                    this.toastr.success('La collecte a changé de statut', 'Collecte');
                }
            )
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
        if (this.user) {
            this.passages.loadUserPassages(
                this.user.id,
                this.sort.active,
                this.sort.direction,
                this.paginator.pageIndex,
                this.paginator.pageSize);
        }
    }

    countUserPassages(): void {
        if (this.user) {
            this.passageService.countUserPassages(this.user.id).subscribe(
                (totalPassages: number) => {
                    this.totalPassages = totalPassages;
                }
            )
        }
    }

    editPassage(idPassage: string): void {
        //TODO modifier pour adapter
        this.router.navigate(['passage', 'edit', idPassage]).then();
    }

    deletePassage(idPassage: string): void {
        // TODO Uniquement pour un admin
        Swal.fire({
            title: `Supprimer cette passage`,
            icon: 'warning',
            text: 'Êtes-vous sûr de vouloir supprimer cette passage ?',
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
                            this.countUserPassages();
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
