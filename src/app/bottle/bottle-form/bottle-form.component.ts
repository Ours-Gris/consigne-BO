import {Component, Input, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Bottle} from "../data/Bottle";
import {BottleService} from "../services/bottle.service";
import {FileValidator} from "ngx-material-file-input";
import {imageFile} from "../../shared/image-file.validator";

@Component({
    selector: 'app-bottle-form',
    templateUrl: './bottle-form.component.html',
    styleUrls: ['./bottle-form.component.css']
})
export class BottleFormComponent implements OnInit {
    @Input() idBottle!: string | null;
    classBottle: string = 'col-md-12';
    authUrl = environment.api_base_url;
    bottleForm: FormGroup;
    bottle!: Bottle;
    readonly maxSize: number = 104857600;
    readonly maxSizePdf: number = 104857600;
    nbrPalette: number = 0;
    nbrPaletteDirty: number = 0;

    nameCtrl: FormControl;
    codeCtrl: FormControl;
    descriptionCtrl: FormControl;
    priceCtrl: FormControl;
    img_bottleCtrl: FormControl;
    pdf_bottleCtrl: FormControl;
    nbr_by_paletteCtrl: FormControl;
    internal_stockCtrl: FormControl;
    internal_stock_dirtyCtrl: FormControl;

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
        this.priceCtrl = fb.control('', [Validators.required]);
        this.img_bottleCtrl = fb.control(null, [FileValidator.maxContentSize(this.maxSize)]);
        this.pdf_bottleCtrl = fb.control(null, [FileValidator.maxContentSize(this.maxSizePdf)]);
        this.nbr_by_paletteCtrl = fb.control('', Validators.required);
        this.internal_stockCtrl = fb.control('', Validators.required);
        this.internal_stock_dirtyCtrl = fb.control('', Validators.required);

        this.bottleForm = fb.group({
            name: this.nameCtrl,
            code: this.codeCtrl,
            description: this.descriptionCtrl,
            price: this.priceCtrl,
            nbr_by_palette: this.nbr_by_paletteCtrl,
            internal_stock: this.internal_stockCtrl,
            internal_stock_dirty: this.internal_stock_dirtyCtrl,
            img_bottle: this.img_bottleCtrl,
            pdf_bottle: this.pdf_bottleCtrl
        }, {
            validator: imageFile('img_bottle')
        } as AbstractControlOptions);
    }

    ngOnInit(): void {
        if (this.idBottle) {
            this.classBottle = 'col-md-6';
            this.getBottle(this.idBottle)
        }
    }

    getBottle(idBottle: string): void {
        this.bottleService.getOneBottle(idBottle).subscribe({
            next: (bottle: Bottle) => {
                this.bottle = bottle;
                this.setFormValue();
                this.getPalettes()
            },
            error: () => {
                this.router.navigate(['/not-found']).then()
            }
        })
    }

    setFormValue() {
        this.bottleForm.setValue({
            name: this.bottle.name,
            code: this.bottle.code,
            description: this.bottle.description,
            price: this.bottle.price,
            nbr_by_palette: this.bottle.nbr_by_palette,
            internal_stock: this.bottle.internal_stock,
            internal_stock_dirty: this.bottle.internal_stock_dirty,
            img_bottle: '',
            pdf_bottle: ''
        })
    }

    getFile(fileName: string) {
        this.bottleService.getBottleFile(fileName).subscribe(
            (data: Blob) => {
                const blob = new Blob([data], {
                    type: 'application/pdf'
                });
                const url = window.URL.createObjectURL(blob);
                window.open(url);
            }
        )
    }

    getPalettes() {
        this.nbrPalette = Math.floor(this.bottle.internal_stock / this.bottle.nbr_by_palette);
        this.nbrPalette = isNaN(this.nbrPalette) ? 0 : this.nbrPalette;

        this.nbrPaletteDirty = Math.floor(this.bottle.internal_stock_dirty / this.bottle.nbr_by_palette);
        this.nbrPaletteDirty = isNaN(this.nbrPaletteDirty) ? 0 : this.nbrPaletteDirty;
    }

    onChangePalettes() {
        this.nbrPalette = Math.floor(this.bottleForm.value.internal_stock / this.bottleForm.value.nbr_by_palette);
        this.nbrPalette = isNaN(this.nbrPalette) ? 0 : this.nbrPalette;

        this.nbrPaletteDirty = Math.floor(this.bottleForm.value.internal_stock_dirty / this.bottleForm.value.nbr_by_palette);
        this.nbrPaletteDirty = isNaN(this.nbrPaletteDirty) ? 0 : this.nbrPaletteDirty;
    }

    onSubmit(): void {
        if (this.bottleForm.value.img_bottle && this.bottleForm.value.img_bottle._files) {
            this.bottleForm.value.img_bottle = this.bottleForm.value.img_bottle._files[0]
            // For delete old img
            if (this.bottle && this.bottle.img_name) {
                this.bottleForm.value.img_name = this.bottle.img_name
            }
        }
        if (this.bottleForm.value.pdf_bottle && this.bottleForm.value.pdf_bottle._files) {
            this.bottleForm.value.pdf_bottle = this.bottleForm.value.pdf_bottle._files[0]
            // For delete old pdf
            if (this.bottle && this.bottle.pdf_name) {
                this.bottleForm.value.pdf_name = this.bottle.pdf_name
            }
        }
        if (this.idBottle) {
            this.bottleService.editBottle(this.bottle.id, this.bottleForm.value).subscribe({
                next: () => {
                    this.toastr.success('Le type de bouteille a été modifié', 'Modifier');
                    this.router.navigateByUrl('/bottle').catch(err => console.error(err));
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        } else {
            this.bottleService.addBottle(this.bottleForm.value).subscribe({
                next: () => {
                    this.toastr.success('Le type de bouteille a été ajouté', 'Ajouter');
                    this.router.navigateByUrl('/bottle').catch(err => console.error(err));
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
