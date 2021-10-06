import { Component, OnInit } from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MaterialService} from "../services/material.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {FileValidator} from "ngx-material-file-input";
import {imageFile} from "../../shared/image-file.validator";

@Component({
  selector: 'app-material-add',
  templateUrl: './material-add.component.html',
  styleUrls: ['./material-add.component.css']
})
export class MaterialAddComponent implements OnInit {
    addMaterialForm: FormGroup;
    nameCtrl: FormControl;
    codeCtrl: FormControl;
    descriptionCtrl: FormControl;
    priceCtrl: FormControl;
    img_materialCtrl: FormControl;
    internal_stockCtrl: FormControl;

    readonly maxSize: number = 104857600;

    constructor(
        private fb: FormBuilder,
        private materialService: MaterialService,
        private toastr: ToastrService,
        public router: Router
    ) {
        this.nameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.codeCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.descriptionCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.priceCtrl = fb.control('', [Validators.required]);
        this.img_materialCtrl = fb.control(undefined, [FileValidator.maxContentSize(this.maxSize)]);
        this.internal_stockCtrl = fb.control('', Validators.required);

        this.addMaterialForm = fb.group({
            name: this.nameCtrl,
            code: this.codeCtrl,
            description: this.descriptionCtrl,
            price: this.priceCtrl,
            internal_stock: this.internal_stockCtrl,
            img_material: this.img_materialCtrl
        }, {
            validator: imageFile('img_material')
        } as AbstractControlOptions);
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        if (this.addMaterialForm.value.img_material && this.addMaterialForm.value.img_material._files) {
            this.addMaterialForm.value.img_material = this.addMaterialForm.value.img_material._files[0]
        }
        this.materialService.addMaterial(this.addMaterialForm.value).subscribe({
            next: () => {
                this.toastr.success('Le type de matériel a été ajouté', 'Ajouter');
                this.router.navigateByUrl('/material').catch(err => console.error(err));
            },
            error: error => {
                console.error(error);
                if (Array.isArray(error)) {
                    error.map((err: string) => {this.toastr.error(err, 'Error !')})
                } else {
                    this.toastr.error(error, 'Error !');
                }
            }
        })
    }
}
