import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BottleService} from "../services/bottle.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Bottle} from "../data/Bottle";

@Component({
    selector: 'app-bottle-edit',
    templateUrl: './bottle-edit.component.html',
    styleUrls: ['./bottle-edit.component.css']
})
export class BottleEditComponent implements OnInit {
    editBottleForm: FormGroup;
    bottle!: Bottle;

    nameCtrl: FormControl;
    codeCtrl: FormControl;
    descriptionCtrl: FormControl;

    constructor(
        private fb: FormBuilder,
        private bottleService: BottleService,
        private toastr: ToastrService,
        public route: ActivatedRoute,
        public router: Router
    ) {
        this.nameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.codeCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.descriptionCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);

        this.editBottleForm = fb.group({
            name: this.nameCtrl,
            code: this.codeCtrl,
            description: this.descriptionCtrl
        });
    }

    ngOnInit(): void {
        this.getOneBottle(this.route.snapshot.paramMap.get('idBottle'));
    }

    getOneBottle(idBottle: string | null): void {
        if (idBottle) {
            this.bottleService.getOneBottle(idBottle).subscribe({
                next: (bottle: Bottle) => {
                    this.bottle = bottle;
                    this.editBottleForm.setValue({
                        name: this.bottle.name,
                        code: this.bottle.code,
                        description: this.bottle.description
                    });
                },
                error: error => {
                    console.error(error);
                    this.router.navigate(['/not-found']).then();
                }
            });
        }
    }

    onSubmit(): void {
        this.bottleService.editBottle(this.bottle.id, this.editBottleForm.value).subscribe({
            next: () => {
                this.toastr.success('Le type de bouteille a été Modifié', 'Modifier');
                this.router.navigateByUrl('/bottle').catch(err => console.error(err));
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
