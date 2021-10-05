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
    readonly maxSizePdf: number = 104857600;
    nbrPalette: number = 0;

    nameCtrl: FormControl;
    codeCtrl: FormControl;
    descriptionCtrl: FormControl;
    img_bottleCtrl: FormControl;
    pdf_bottleCtrl: FormControl;
    nbr_by_paletteCtrl: FormControl;
    internal_stockCtrl: FormControl;

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
        this.img_bottleCtrl = fb.control(null, [FileValidator.maxContentSize(this.maxSize)]);
        this.pdf_bottleCtrl = fb.control(null, [FileValidator.maxContentSize(this.maxSizePdf)]);
        this.nbr_by_paletteCtrl = fb.control('', Validators.required);
        this.internal_stockCtrl = fb.control('', Validators.required);


        this.editBottleForm = fb.group({
            name: this.nameCtrl,
            code: this.codeCtrl,
            description: this.descriptionCtrl,
            nbr_by_palette: this.nbr_by_paletteCtrl,
            internal_stock: this.internal_stockCtrl,
            img_bottle: this.img_bottleCtrl,
            pdf_bottle: this.pdf_bottleCtrl
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
                        nbr_by_palette: this.bottle.nbr_by_palette,
                        internal_stock: this.bottle.internal_stock,
                        img_bottle: '',
                        pdf_bottle: ''
                    });
                    this.nbrPalette = Math.floor(this.bottle.internal_stock / this.bottle.nbr_by_palette);
                    this.nbrPalette = isNaN(this.nbrPalette) ? 0 : this.nbrPalette;
                },
                error: error => {
                    console.error(error);
                    this.router.navigate(['/not-found']).then();
                }
            });
        }
    }

    getFile(fileName: string) {
        this.bottleService.getBottleFile(fileName).subscribe(
            (data: Blob) => {
                const blob = new Blob([data], {
                    type: 'application/pdf'
                });
                const url= window.URL.createObjectURL(blob);
                window.open(url);
            }
        )
    }

    onChangePalette() {
        this.nbrPalette = Math.floor(this.editBottleForm.value.internal_stock / this.editBottleForm.value.nbr_by_palette);
        this.nbrPalette = isNaN(this.nbrPalette) ? 0 : this.nbrPalette;
    }

    onSubmit(): void {
        if (this.editBottleForm.value.img_bottle && this.editBottleForm.value.img_bottle._files) {
            this.editBottleForm.value.img_bottle = this.editBottleForm.value.img_bottle._files[0]
            // For delete old img
            if (this.bottle.img_name) {
                this.editBottleForm.value.img_name = this.bottle.img_name
            }
        }
        if (this.editBottleForm.value.pdf_bottle && this.editBottleForm.value.pdf_bottle._files) {
            this.editBottleForm.value.pdf_bottle = this.editBottleForm.value.pdf_bottle._files[0]
            // For delete old pdf
            if (this.bottle.pdf_name) {
                this.editBottleForm.value.pdf_name = this.bottle.pdf_name
            }
        }
        this.bottleService.editBottle(this.bottle.id, this.editBottleForm.value).subscribe({
            next: () => {
                this.toastr.success('Le type de bouteille a été modifié', 'Modifier');
                this.router.navigateByUrl('/bottle').catch(err => console.error(err));
            },
            error: error => {
                console.error(error);
                if (Array.isArray(error)) {
                    error.map((err: string) => {this.toastr.error(err, 'Error !')})
                } else {
                    this.toastr.error(error, 'Error !');
                }
            }
        });
    }
}
