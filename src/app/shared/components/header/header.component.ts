import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    logged = false;

    constructor(
        private authService: AuthService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.authService.currentUser.subscribe(user => this.logged = !!user);
    }

    logout(): void {
        this.authService.logout();
        Swal.fire(`You are disconnected`).then();
        this.router.navigateByUrl('').then();
    }
}
