import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {BottleService} from "../services/bottle.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Bottle} from "../data/Bottle";
import {FileValidator} from "ngx-material-file-input";
import {imageFile} from "../../shared/image-file.validator";

@Component({
    selector: 'app-bottle-edit',
    templateUrl: './bottle-edit.component.html',
    styleUrls: ['./bottle-edit.component.css']
})
export class BottleEditComponent implements OnInit {
    authUrl = environment.api_base_url;
    editBottleForm: FormGroup;
    bottle!: Bottle;
    readonly maxSize: number = 104857600;

    nameCtrl: FormControl;
    codeCtrl: FormControl;
    descriptionCtrl: FormControl;
    img_bottleCtrl: FormControl;

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
        this.img_bottleCtrl = fb.control('', [FileValidator.maxContentSize(this.maxSize)]);

        this.editBottleForm = fb.group({
            name: this.nameCtrl,
            code: this.codeCtrl,
            description: this.descriptionCtrl,
            img_bottle: this.img_bottleCtrl
        }, {
            validator: imageFile('img_bottle')
        } as AbstractControlOptions);
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
                        description: this.bottle.description,
                        img_bottle: ''
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
        const formData = new FormData();
        formData.append('name', this.editBottleForm.value.name);
        formData.append('code', this.editBottleForm.value.code);
        formData.append('description', this.editBottleForm.value.description);

        if (this.editBottleForm.value.img_bottle._files) {
            formData.append('img_bottle', this.editBottleForm.value.img_bottle._files[0]);
            // For delete old img
            if (this.bottle.img_name) {
                formData.append('img_name', this.bottle.img_name)
            }
        }
        this.bottleService.editBottle(this.bottle.id, formData).subscribe({
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
