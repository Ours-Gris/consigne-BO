import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {MustMatch} from "../../shared/must-match.validator";
import {ToastrService} from "ngx-toastr";
import {Role} from "../../models/Role";

@Component({
    selector: 'app-user-add',
    templateUrl: './user-add.component.html',
    styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
    addUserForm: FormGroup;
    roles = Object.values(Role);

    usernameCtrl: FormControl;
    emailCtrl: FormControl;
    passwordCtrl: FormControl;
    passwordRepeatCtrl: FormControl;
    companyCtrl!: FormControl;
    adressCtrl!: FormControl;
    adress_detailsCtrl!: FormControl;
    postal_codeCtrl!: FormControl;
    cityCtrl!: FormControl;
    telCtrl!: FormControl;
    roleCtrl: FormControl;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private toastr: ToastrService,
        public router: Router
    ) {
        this.usernameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.emailCtrl = fb.control('', [Validators.required, Validators.email, Validators.minLength(3)]);
        this.passwordCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.passwordRepeatCtrl = fb.control('', Validators.required);
        this.companyCtrl = fb.control('');
        this.adressCtrl = fb.control('');
        this.adress_detailsCtrl = fb.control('');
        this.postal_codeCtrl = fb.control('');
        this.cityCtrl = fb.control('');
        this.telCtrl = fb.control('');
        this.roleCtrl = fb.control('', [Validators.required]);


        this.addUserForm = fb.group({
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
            role: this.roleCtrl

        }, {
            validator: MustMatch('password', 'passwordRepeat')
        } as AbstractControlOptions);
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.userService.addUser(this.addUserForm.value).subscribe({
            next: () => {
                this.toastr.success('L\'utilisateur a été ajouté', 'Ajouter');
                this.router.navigateByUrl('/user').catch(err => console.error(err));
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
