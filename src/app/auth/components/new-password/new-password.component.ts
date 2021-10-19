import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {MustMatch} from "../../../shared/must-match.validator";

@Component({
    selector: 'app-new-password',
    templateUrl: './new-password.component.html',
    styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
    userForm!: FormGroup;
    passwordCtrl!: FormControl;
    passwordRepeatCtrl: FormControl;
    resetToken?: string;
    welcome?: boolean

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        public router: Router,
        private toastr: ToastrService,
        public route: ActivatedRoute
    ) {
        this.resetToken = this.route.snapshot.queryParams.token
        if (!this.resetToken) {
            this.router.navigateByUrl('').catch(err => console.error(err));
        }
        this.authService.logout()
        this.passwordCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.passwordRepeatCtrl = fb.control('', Validators.required);
        this.userForm = fb.group({
            password: this.passwordCtrl,
            passwordRepeat: this.passwordRepeatCtrl,
        }, {
            validator: MustMatch('password', 'passwordRepeat')
        } as AbstractControlOptions);
    }

    ngOnInit(): void {
        this.welcome = this.route.snapshot.queryParams.welcome
        if (this.welcome && this.resetToken) {
            this.confirm(this.resetToken)
        }
    }

    onReset(): void {
        if (this.userForm.valid && this.resetToken) {
            this.authService.updatePassword(this.resetToken, this.userForm.value.password).subscribe({
                next: () => {
                    this.router.navigateByUrl('auth/login').catch(err => console.error(err));
                    this.toastr.success('Votre mots de passe a été mis à jour', 'Modification');
                },
                error: (err: HttpErrorResponse) => {
                    console.error(err);
                    this.toastr.error('Ça n\'a pas fonctionné !', 'Erreur');
                }
            });
        }
    }

    confirm(token: string): void {
        this.authService.confirm(token).subscribe({
            next: () => {
                this.toastr.success('Votre email est confirmé', 'Confirmation');
            },
            error: () => {
                this.toastr.error('Erreur de confirmation de l\'email', 'Confirmation');
            }
        });
    }
}
