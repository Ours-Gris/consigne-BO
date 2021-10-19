import { Component, OnInit } from '@angular/core';
import {User} from "../../user/data/User";
import {Role} from "../../user/data/Role";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../user/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    user!: User;
    readonly Role = Role;

  constructor(
      private _authService: AuthService,
      private userService: UserService,
      public router: Router
  ) { }

    ngOnInit(): void {
        this.getMe()
    }

    getMe(): void {
        if (this._authService.currentUser && this._authService.currentUserValue) {
            this.userService.getMe().subscribe({
                next: (user: User) => {
                    this.user = user;
                },
                error: error => {
                    console.error(error);
                }
            })
        }
    }

}
