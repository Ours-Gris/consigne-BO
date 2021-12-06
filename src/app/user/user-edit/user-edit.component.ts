import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../data/User";
import {UserService} from "../services/user.service";
import {Role} from "../data/Role";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    user!: User;
    Role = Role;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.getOneUser(this.route.snapshot.paramMap.get('idUser'))
    }

    getOneUser(idUser: string | null): void {
        if (idUser) {
            this.userService.getOneUser(idUser).subscribe({
                next: (user: User) => {
                    this.user = user;
                },
                error: error => {
                    console.error(error);
                    this.router.navigate(['/not-found']).then();
                }
            });
        }
    }
}
