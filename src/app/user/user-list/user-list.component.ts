import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/User";
import {UsersDataSource} from "../data/users-data-source";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    user!: User;
    users!: UsersDataSource;
    displayedColumns: string[] = ['username', 'email', 'actions'];
    totalUsers: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('input') input!: ElementRef;

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private snackBar: MatSnackBar,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        if (this.authService.currentUserValue) {
            this.users = new UsersDataSource(this.userService);
            this.users.loadUsers();
        }
    }

    ngAfterViewInit(): void {
        this.countAllUsers();

        // server-side search
        fromEvent(this.input.nativeElement, 'keyup').pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadUsersPage();
                this.countAllUsers();
            })
        ).subscribe();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => {
                this.loadUsersPage();
            })
        ).subscribe();
    }

    loadUsersPage(): void {
        this.users.loadUsers(
            this.input.nativeElement.value,
            this.sort.active + ':' + this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    countAllUsers(): void {
        this.userService.countAllUsers(
            this.input.nativeElement.value
        ).subscribe(
            (totalUsers: number) => {
                this.totalUsers = totalUsers;
            }
        );
    }

    editUser(idUser: string): void {
        this.router.navigate(['user', 'edit', idUser]).then();
    }

    deleteUser(idUser: string): void {
        this.userService.deleteUser(idUser).subscribe(
            () => {
                this.loadUsersPage();
                this.snackBar.open('User deleted !', '', {duration: 3000});
            }
        );
    }
}
