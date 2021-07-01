import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Role} from "../../../models/Role";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    logged = false;
    roleAdmin: boolean = false;
    idCurrentUser: string | undefined;

    constructor(
        private _authService: AuthService,
        private toastr: ToastrService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        if (this._authService.currentUser) {
            this._authService.currentUser.subscribe(user => {
                this.logged = !!user;
                this.roleAdmin = user?.role === Role.ADMIN;
                this.idCurrentUser = user?.sub;
            });
        }
    }

    logout(): void {
        this._authService.logout();
        this.router.navigateByUrl('').then();
        this.toastr.success('Vous êtes déconnecté', 'Déconnection');
    }
}
