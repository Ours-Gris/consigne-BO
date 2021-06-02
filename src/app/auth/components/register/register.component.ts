import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {User} from '../../../models/User';
import {MustMatch} from "../../../shared/must-match.validator";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    user!: User;
    userForm!: FormGroup;
    usernameCtrl!: FormControl;
    emailCtrl!: FormControl;
    passwordCtrl!: FormControl;
    passwordRepeatCtrl!: FormControl;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        public router: Router
    ) {
        // redirect to home if already logged in
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']).catch(err => console.error(err));
        } else {
            this.usernameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
            this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
            this.passwordCtrl = fb.control('', Validators.required);
            this.passwordRepeatCtrl = fb.control('', Validators.required);

            this.userForm = fb.group({
                username: this.usernameCtrl,
                email: this.emailCtrl,
                password: this.passwordCtrl,
                passwordRepeat: this.passwordRepeatCtrl
            }, {
                validator: MustMatch('password', 'passwordRepeat')
            });
        }
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.authService.register(this.userForm.value).subscribe({
            next: () => {
                this.router.navigateByUrl('').catch(err => console.error(err));
                Swal.fire(`User created`).then();
            },
            error: (err: HttpErrorResponse) => {
                console.error(err);
                //todo à corriger
                Swal.fire(err.error.message[0].messages[0].message).then();
            }
        });
    }
}
