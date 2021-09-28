import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {BottleService} from "../services/bottle.service";
import {FileValidator} from 'ngx-material-file-input';
import {imageFile} from "../../shared/image-file.validator";

@Component({
    selector: 'app-bottle-add',
    templateUrl: './bottle-add.component.html',
    styleUrls: ['./bottle-add.component.css']
})
export class BottleAddComponent implements OnInit {
    addBottleForm: FormGroup;
    nameCtrl: FormControl;
    codeCtrl: FormControl;
    descriptionCtrl: FormControl;
    img_bottleCtrl: FormControl;
    nbr_by_paletteCtrl: FormControl;
    internal_stockCtrl: FormControl;

    readonly maxSize: number = 104857600;

    constructor(
        private fb: FormBuilder,
        private bottleService: BottleService,
        private toastr: ToastrService,
        public router: Router
    ) {
        this.nameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.codeCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.descriptionCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.img_bottleCtrl = fb.control(undefined, [FileValidator.maxContentSize(this.maxSize)]);
        this.nbr_by_paletteCtrl = fb.control('', Validators.required);
        this.internal_stockCtrl = fb.control('', Validators.required);

        this.addBottleForm = fb.group({
            name: this.nameCtrl,
            code: this.codeCtrl,
            description: this.descriptionCtrl,
            nbr_by_palette: this.nbr_by_paletteCtrl,
            internal_stock: this.internal_stockCtrl,
            img_bottle: this.img_bottleCtrl
        }, {
            validator: imageFile('img_bottle')
        } as AbstractControlOptions);
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        if (this.addBottleForm.value.img_bottle && this.addBottleForm.value.img_bottle._files) {
            this.addBottleForm.value.img_bottle = this.addBottleForm.value.img_bottle._files[0]
        }
        this.bottleService.addBottle(this.addBottleForm.value).subscribe({
            next: () => {
                this.toastr.success('Le type de bouteille a été ajouté', 'Ajouter');
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
