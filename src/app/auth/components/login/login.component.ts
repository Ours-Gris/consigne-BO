import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    userForm!: FormGroup;
    emailCtrl!: FormControl;
    passwordCtrl!: FormControl;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private toastr: ToastrService,
        public router: Router,
        public route: ActivatedRoute
    ) {
        this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
        this.passwordCtrl = fb.control('', Validators.required);

        this.userForm = fb.group({
            email: this.emailCtrl,
            password: this.passwordCtrl
        });
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.authService.login(this.userForm.value).subscribe({
            next: () => {
                this.router.navigateByUrl('dashboard').catch(err => console.error(err));
                this.toastr.success('Vous êtes connecté', 'Connection');
            },
            error: error => {
                console.error(error);
                this.toastr.error('Identifiant ou mots de passe incorrecte', 'Connection');
            }
        });
    }
}
