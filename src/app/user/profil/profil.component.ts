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
    companyCtrl!: FormControl;
    adressCtrl!: FormControl;
    adress_detailsCtrl!: FormControl;
    postal_codeCtrl!: FormControl;
    cityCtrl!: FormControl;
    telCtrl!: FormControl;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private toastr: ToastrService,
        public router: Router,
        public route: ActivatedRoute
    ) {
        this.usernameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
        this.companyCtrl = fb.control('');
        this.adressCtrl = fb.control('');
        this.adress_detailsCtrl = fb.control('');
        this.postal_codeCtrl = fb.control('');
        this.cityCtrl = fb.control('');
        this.telCtrl = fb.control('');

        this.editUserForm = fb.group({
            username: this.usernameCtrl,
            email: this.emailCtrl,
            company: this.companyCtrl,
            adress: this.adressCtrl,
            adress_details: this.adress_detailsCtrl,
            postal_code: this.postal_codeCtrl,
            city: this.cityCtrl,
            tel: this.telCtrl
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
                    email: this.user.email,
                    company: this.user.company,
                    adress: this.user.adress,
                    adress_details: this.user.adress_details,
                    postal_code: this.user.postal_code,
                    city: this.user.city,
                    tel: this.user.tel
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
