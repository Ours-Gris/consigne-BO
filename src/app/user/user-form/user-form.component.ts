import {Component, Input, OnInit} from '@angular/core';
import {User} from "../data/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Role} from "../data/Role";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    @Input() user!: User | null;
    @Input() profil!: boolean;
    userForm: FormGroup;
    roles = Object.values(Role);
    isAdmin = false;

    usernameCtrl: FormControl;
    companyCtrl!: FormControl;
    telCtrl!: FormControl;
    emailCtrl: FormControl;
    roleCtrl: FormControl;
    resellerCtrl: FormControl;
    producerCtrl: FormControl;
    collecte_pointCtrl: FormControl;
    addressCtrl!: FormControl;
    address_detailsCtrl!: FormControl;
    postal_codeCtrl!: FormControl;
    cityCtrl!: FormControl;
    delivery_addressCtrl: FormControl;
    delivery_address_detailsCtrl: FormControl;
    delivery_postal_codeCtrl: FormControl;
    delivery_cityCtrl: FormControl;
    delivery_dataCtrl: FormControl;
    delivery_schedulesCtrl: FormControl;
    heavy_truckCtrl: FormControl;
    stackerCtrl: FormControl;
    forkliftCtrl: FormControl;
    pallet_truckCtrl: FormControl;
    internal_dataCtrl: FormControl;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private toastr: ToastrService,
        public router: Router,
        public route: ActivatedRoute
    ) {
        this.usernameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
        this.companyCtrl = fb.control('');
        this.telCtrl = fb.control('');
        this.resellerCtrl = fb.control(false);
        this.producerCtrl = fb.control(false);
        this.collecte_pointCtrl = fb.control(false);
        this.roleCtrl = fb.control('user', [Validators.required]);

        this.addressCtrl = fb.control('');
        this.address_detailsCtrl = fb.control('');
        this.postal_codeCtrl = fb.control('');
        this.cityCtrl = fb.control('');

        this.delivery_addressCtrl = fb.control('');
        this.delivery_address_detailsCtrl = fb.control('');
        this.delivery_postal_codeCtrl = fb.control('');
        this.delivery_cityCtrl = fb.control('');

        this.delivery_dataCtrl = fb.control('');
        this.delivery_schedulesCtrl = fb.control('');
        this.heavy_truckCtrl = fb.control(false);
        this.stackerCtrl = fb.control(false);
        this.forkliftCtrl = fb.control(false);
        this.pallet_truckCtrl = fb.control(false);

        this.internal_dataCtrl = fb.control('');

        this.userForm = fb.group({
            username: this.usernameCtrl,
            email: this.emailCtrl,
            company: this.companyCtrl,
            address: fb.group({
                address: this.addressCtrl,
                address_details: this.address_detailsCtrl,
                postal_code: this.postal_codeCtrl,
                city: this.cityCtrl,
            }),
            delivery_address: fb.group({
                address: this.delivery_addressCtrl,
                address_details: this.delivery_address_detailsCtrl,
                postal_code: this.delivery_postal_codeCtrl,
                city: this.delivery_cityCtrl,
            }),
            tel: this.telCtrl,
            reseller: this.resellerCtrl,
            producer: this.producerCtrl,
            collecte_point: this.collecte_pointCtrl,
            heavy_truck: this.heavy_truckCtrl,
            delivery_data: this.delivery_dataCtrl,
            delivery_schedules: this.delivery_schedulesCtrl,
            stacker: this.stackerCtrl,
            forklift: this.forkliftCtrl,
            pallet_truck: this.pallet_truckCtrl,
            role: this.roleCtrl,
            internal_data: this.internal_dataCtrl
        });
    }

    ngOnInit(): void {
        this.setFormValue()
    }

    setFormValue() {
        if (this.user) {
            this.isAdmin = this.user.role === Role.ADMIN;
            this.userForm.setValue({
                username: this.user.username,
                email: this.user.email,
                company: this.user.company,
                address: {
                    address: this.user.address ? this.user.address.address : '',
                    address_details: this.user.address ? this.user.address.address_details : '',
                    postal_code: this.user.address ? this.user.address.postal_code : '',
                    city: this.user.address ? this.user.address.city : ''
                },
                delivery_address: {
                    address: this.user.delivery_address ? this.user.delivery_address.address : '',
                    address_details: this.user.delivery_address ? this.user.delivery_address.address_details : '',
                    postal_code: this.user.delivery_address ? this.user.delivery_address.postal_code : '',
                    city: this.user.delivery_address ? this.user.delivery_address.city : ''
                },
                tel: this.user.tel,
                reseller: this.user.reseller,
                producer: this.user.producer,
                collecte_point: this.user.collecte_point,
                heavy_truck: this.user.heavy_truck,
                delivery_data: this.user.delivery_data,
                delivery_schedules: this.user.delivery_schedules,
                stacker: this.user.stacker,
                forklift: this.user.forklift,
                pallet_truck: this.user.pallet_truck,
                role: this.user.role,
                internal_data: this.user.internal_data
            })
        }
    }

    onChangeRole(event: any) {
        if (event.value === Role.ADMIN) {
            Swal.fire({
                title: `Changement de rôle`,
                icon: 'warning',
                text: 'Êtes-vous sûr de vouloir donner des droits administrateur à cet utilisateur ?',
                showConfirmButton: true,
                confirmButtonText: 'Changer',
                showCancelButton: true,
                cancelButtonText: 'Annuler'
            }).then(
                (result) => {
                    if (!result.isConfirmed) {
                        this.roleCtrl.setValue(this.user ? this.user.role : Role.USER)
                    }
                }
            )
        }
    }

    onSubmit(): void {
        if (this.profil && this.user) {
            this.userService.editMe(this.userForm.value).subscribe({
                next: () => {
                    this.toastr.success('Votre profil a été Modifié', 'Modifier');
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        } else if (this.user) {
            this.userService.editUser(this.user.id, this.userForm.value).subscribe({
                next: () => {
                    this.toastr.success('L\'utilisateur a été Modifié', 'Modifier');
                    this.router.navigateByUrl('/user').catch(err => console.error(err));
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        } else {
            this.userService.addUser(this.userForm.value).subscribe({
                next: () => {
                    this.toastr.success('L\'utilisateur a été ajouté', 'Ajouter');
                    this.router.navigateByUrl('/user').catch(err => console.error(err));
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        }
    }

    errorSubmit(error: string[] | string) {
        console.error(error);
        if (Array.isArray(error)) {
            error.map((err: string) => {
                this.toastr.error(err, 'Error !');
            })
        } else {
            this.toastr.error(error, 'Error !');
        }
    }
}
