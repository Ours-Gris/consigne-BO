import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Role} from "../../models/Role";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    user!: User;
    editUserForm: FormGroup;
    roles = Object.values(Role);

    usernameCtrl: FormControl;
    emailCtrl: FormControl;
    roleCtrl: FormControl;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private toastr: ToastrService,
        public router: Router,
        public route: ActivatedRoute
    ) {
        this.usernameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
        this.roleCtrl = fb.control('', [Validators.required]);

        this.editUserForm = fb.group({
            username: this.usernameCtrl,
            email: this.emailCtrl,
            role: this.roleCtrl
        });
    }

    ngOnInit(): void {
        this.getOneUser(this.route.snapshot.paramMap.get('idUser'));
    }

    getOneUser(idUser: string | null): void {
        if (idUser) {
            this.userService.getOneUser(idUser).subscribe({
                next: (user: User) => {
                    this.user = user;
                    this.editUserForm.setValue({
                        username: this.user.username,
                        email: this.user.email,
                        role: this.user.role
                    });
                },
                error: error => {
                    console.error(error);
                    this.router.navigate(['/not-found']).then();
                    // Swal.fire(error.error.message[0].messages[0].message).then();
                }
            });
        }
    }

    onSubmit(): void {
        this.userService.editUser(this.user.id, this.editUserForm.value).subscribe({
            next: () => {
                this.toastr.success('L\'utilisateur a été Modifié', 'Modifier');
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
