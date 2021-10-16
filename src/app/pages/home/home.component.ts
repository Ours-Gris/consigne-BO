import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {Role} from "../../user/data/Role";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    logged = false;
    roleAdmin: boolean = false;
    idCurrentUser!: string | null;

    constructor(
        private _authService: AuthService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        if (this._authService.currentUser) {
            this._authService.currentUser.subscribe(user => {
                this.logged = !!user;
                this.roleAdmin = user?.role === Role.ADMIN;
                this.idCurrentUser = user && user.sub ? user.sub : null;
            });
        }
    }

}
