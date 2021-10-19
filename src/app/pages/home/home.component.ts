import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    logged = false;

    constructor(
        private _authService: AuthService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        if (this._authService.currentUser) {
            this._authService.currentUser.subscribe(user => {
                this.logged = !!user;
                if (this.logged) {
                    this.router.navigateByUrl('dashboard').catch(err => console.error(err));
                }
            });
        }
    }
}
