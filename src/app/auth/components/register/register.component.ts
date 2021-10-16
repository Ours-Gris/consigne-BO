import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {User} from '../../../user/data/User';
import {MustMatch} from "../../../shared/must-match.validator";
import {ToastrService} from "ngx-toastr";

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
    companyCtrl!: FormControl;
    adressCtrl!: FormControl;
    adress_detailsCtrl!: FormControl;
    postal_codeCtrl!: FormControl;
    cityCtrl!: FormControl;
    telCtrl!: FormControl;
    captchaCtrl!: FormControl;
    roleCtrl!: FormControl;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        public router: Router,
        private toastr: ToastrService,
    ) {
        // redirect to home if already logged in
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']).catch(err => console.error(err));
        } else {
            this.usernameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
            this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
            this.passwordCtrl = fb.control('', [Validators.required, Validators.minLength(6)]);
            this.passwordRepeatCtrl = fb.control('', Validators.required);
            this.companyCtrl = fb.control('');
            this.adressCtrl = fb.control('');
            this.adress_detailsCtrl = fb.control('');
            this.postal_codeCtrl = fb.control('');
            this.cityCtrl = fb.control('');
            this.telCtrl = fb.control('');
            // this.captchaCtrl = fb.control('', Validators.required);
            this.roleCtrl = fb.control('', [Validators.required]);

            this.userForm = fb.group({
                username: this.usernameCtrl,
                email: this.emailCtrl,
                password: this.passwordCtrl,
                passwordRepeat: this.passwordRepeatCtrl,
                company: this.companyCtrl,
                adress: this.adressCtrl,
                adress_details: this.adress_detailsCtrl,
                postal_code: this.postal_codeCtrl,
                city: this.cityCtrl,
                tel: this.telCtrl,
                // captcha: this.captchaCtrl,
                role: this.roleCtrl
            }, {
                validator: MustMatch('password', 'passwordRepeat')
            } as AbstractControlOptions);
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
            error: (error) => {
                console.error(error);
                if (Array.isArray(error)) {
                    error.map((err: string) => {
                        this.toastr.error(err, 'Error !');
                    })
                } else {
                    this.toastr.error(error, 'Error !');
                }
            }
        });
    }
}
