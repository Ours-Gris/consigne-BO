import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UsersDataSource} from "../data/users-data-source";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../services/user.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import Swal from "sweetalert2";
import {PassageService} from "../../passage/passage.service";
import {CollecteStatus} from "../data/collecte.status";

@Component({
  selector: 'app-user-waiting-passage',
  templateUrl: './user-waiting-passage.component.html',
  styleUrls: ['./user-waiting-passage.component.css']
})
export class UserWaitingPassageComponent implements OnInit, AfterViewInit {
    CollecteStatus = CollecteStatus;
    users!: UsersDataSource;
    displayedColumns: string[] = ['collecte_status', 'company', 'username', 'tel', 'delivery_schedules', 'delivery_data', 'city', 'actions'];
    totalUsers: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('input') input!: ElementRef;

    constructor(
        private userService: UserService,
        private passageService: PassageService,
        private toastr: ToastrService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.users = new UsersDataSource(this.userService);
        this.users.loadUsersWaitingPassage();
    }

    ngAfterViewInit(): void {
        this.countUsersWaitingPassage();

        // server-side search
        fromEvent(this.input.nativeElement, 'keyup').pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadUsersWaitingPassagePage();
                this.countUsersWaitingPassage();
            })
        ).subscribe();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => {
                this.loadUsersWaitingPassagePage();
            })
        ).subscribe();
    }

    loadUsersWaitingPassagePage(): void {
        this.users.loadUsersWaitingPassage(
            this.input.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    countUsersWaitingPassage(): void {
        this.userService.countUsersWaitingPassage(
            this.input.nativeElement.value
        ).subscribe(
            (totalUsers: number) => {
                this.totalUsers = totalUsers;
            }
        )
    }

    addPassage(idUser: string): void {
        Swal.fire({
            title: `Ajouter un passage`,
            icon: 'question',
            input: 'number',
            inputLabel: 'Combient de bouteilles ont été collectées ?',
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: 'Annuler'
        }).then(response => {
            if (response.isConfirmed && response.value && response.value != 0) {
                this.passageService.addPassage({
                    bottles_collected: Math.abs(response.value),
                    user: idUser
                }).subscribe({
                    next: () => {
                        this.editCollecteStatus(idUser);
                        this.toastr.success('Le passage a été ajouté', 'Ajouter');
                    },
                    error: (err) => {
                        this.errorSubmit(err)
                    }
                })
            }
        })
    }

    editUser(idUser: string): void {
        this.router.navigate(['user', 'edit', idUser]).then();
    }

    editCollecteStatus(idUser: string): void {
        this.userService.editUser(idUser, {collecte_status: CollecteStatus.IN_FILLING}).subscribe({
                next: () => {
                    this.loadUsersWaitingPassagePage();
                    this.countUsersWaitingPassage();
                    this.toastr.success('L\'état de la collecte a été modifier', 'Modification');
                },
            error: (err) => {
                this.errorSubmit(err)
            }
            }
        )
    }

    errorSubmit(error: string[] | string): void {
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
