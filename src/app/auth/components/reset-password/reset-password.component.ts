import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    userForm!: FormGroup;
    emailCtrl!: FormControl;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        public router: Router
    ) {
        this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
        this.userForm = fb.group({
            email: this.emailCtrl
        });
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        console.log(this.userForm.value);
        console.log(this.userForm.valid);
        if (this.userForm.valid) {
            this.authService.reset(this.userForm.value.email).subscribe({
                next: () => {
                    Swal.fire(`Vous allez recevoir un mail !`).then();
                },
                error: (err: HttpErrorResponse) => {
                    console.error(err);
                    Swal.fire('Ça n\'a pas fonctionné !').then();
                }
            });
        }
    }
}
