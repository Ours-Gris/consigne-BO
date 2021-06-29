import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

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
        private _snackBar: MatSnackBar,
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
        const token = this.route.snapshot.queryParams.token
        if (token) {
            this.confirm(token)
        }
    }

    onSubmit(): void {
        this.authService.login(this.userForm.value).subscribe({
            next: () => {
                this.router.navigateByUrl('').catch(err => console.error(err));
                this._snackBar.open('Vous êtes connecté', '', {duration: 2000});
            },
            error: error => {
                console.error(error);
                this._snackBar.open('Identifiant ou mots de passe incorrecte', '', {duration: 2000});
            }
        });
    }

    confirm(token: string): void {
        this.authService.confirm(token).subscribe({
            next: () => {
                this.router.navigateByUrl('').catch(err => console.error(err));
                this._snackBar.open('Votre email est confirmé', '', {duration: 2000});
                this._snackBar.open('Vous êtes connecté', '', {duration: 2000});
            },
            error: error => {
                console.error(error);
                this._snackBar.open('Erreur de confirmation de l\'email', '', {duration: 2000});
            }
        });
    }
}
