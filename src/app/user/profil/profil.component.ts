import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-profil',
    templateUrl: './profil.component.html',
    styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
    user!: User;
    editUserForm: FormGroup;

    usernameCtrl: FormControl;
    emailCtrl: FormControl;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private toastr: ToastrService,
        public router: Router,
        public route: ActivatedRoute
    ) {
        this.usernameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.emailCtrl = fb.control('', [Validators.required, Validators.email]);

        this.editUserForm = fb.group({
            username: this.usernameCtrl,
            email: this.emailCtrl
        });
    }

    ngOnInit(): void {
        this.getMe();
    }

    getMe(): void {
        this.userService.getMe().subscribe({
            next: (user: User) => {
                this.user = user;
                this.editUserForm.setValue({
                    username: this.user.username,
                    email: this.user.email
                });
            },
            error: error => {
                console.error(error);
                this.router.navigate(['/not-found']).then();
            }
        });
    }

    onSubmit(): void {
        this.userService.editMe(this.editUserForm.value).subscribe({
            next: () => {
                this.toastr.success('Votre profil a été Modifié', 'Modifier');
                // this.router.navigateByUrl('/user').catch(err => console.error(err));
            },
            error: error => {
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
