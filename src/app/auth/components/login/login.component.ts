import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    userForm!: FormGroup;
    identifierCtrl!: FormControl;
    passwordCtrl!: FormControl;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        public router: Router
    ) {
        // redirect to home if already logged in
        if (this.authService.currentUserToken) {
            this.router.navigate(['/']).catch(err => console.error(err));
        } else {
            this.identifierCtrl = fb.control('', Validators.required);
            this.passwordCtrl = fb.control('', Validators.required);

            this.userForm = fb.group({
                identifier: this.identifierCtrl,
                password: this.passwordCtrl
            });
        }
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.authService.login(this.userForm.value).subscribe({
            next: () => {
                Swal.fire(`You are connected`).then();
                this.router.navigateByUrl('').catch(err => console.error(err));
            },
            error: error => {
                console.error(error);
                Swal.fire(`Identifier or password wrong`).then();
            }
        });
    }
}
