import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Role} from "../../../models/role";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    logged = false;
    roleAdmin: boolean = false;

    constructor(
        private _authService: AuthService,
        private _snackBar: MatSnackBar,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this._authService.currentUser.subscribe(user => {
            this.logged = !!user;
            this.roleAdmin = user?.role === Role.Admin;
        });
    }

    logout(): void {
        this._authService.logout();
        this.router.navigateByUrl('').then();
        this._snackBar.open('Vous êtes déconnecté', '', {duration: 2000});
    }
}
