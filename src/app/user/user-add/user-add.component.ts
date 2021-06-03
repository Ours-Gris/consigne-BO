import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {UserService} from "../services/user.service";
import {MustMatch} from "../../shared/must-match.validator";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
    addUserForm: FormGroup;
    usernameCtrl: FormControl;
    emailCtrl: FormControl;
    passwordCtrl: FormControl;
    passwordRepeatCtrl: FormControl;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        public router: Router
    ) {
        this.usernameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.emailCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.passwordCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.passwordRepeatCtrl = fb.control('', Validators.required);

        this.addUserForm = fb.group({
            username: this.usernameCtrl,
            email: this.emailCtrl,
            password: this.passwordCtrl,
            passwordRepeat: this.passwordRepeatCtrl
        }, {
            validator: MustMatch('password', 'passwordRepeat')
        } as AbstractControlOptions);
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.userService.addUser(this.addUserForm.value).subscribe({
            next: (user: User) => {
                Swal.fire($localize`:@@UserAdd.validate.popup:${user.username} is created`).then();
                this.router.navigateByUrl('/user').catch(err => console.error(err));
            },
            error: error => {
                console.error(error);
                Swal.fire(error.error.message[0].messages[0].message).then();
            }
        });
    }
}
