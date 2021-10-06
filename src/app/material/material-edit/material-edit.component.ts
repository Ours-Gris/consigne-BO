import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Material} from "../data/Material";
import {MaterialService} from "../services/material.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {FileValidator} from "ngx-material-file-input";
import {imageFile} from "../../shared/image-file.validator";

@Component({
  selector: 'app-material-edit',
  templateUrl: './material-edit.component.html',
  styleUrls: ['./material-edit.component.css']
})
export class MaterialEditComponent implements OnInit {
    authUrl = environment.api_base_url;
    editMaterialForm: FormGroup;
    material!: Material;
    readonly maxSize: number = 104857600;

    nameCtrl: FormControl;
    codeCtrl: FormControl;
    descriptionCtrl: FormControl;
    priceCtrl: FormControl;
    img_materialCtrl: FormControl;
    internal_stockCtrl: FormControl;

    constructor(
        private fb: FormBuilder,
        private materialService: MaterialService,
        private toastr: ToastrService,
        public route: ActivatedRoute,
        public router: Router
    ) {
        this.nameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.codeCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.descriptionCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.img_materialCtrl = fb.control(null, [FileValidator.maxContentSize(this.maxSize)]);
        this.priceCtrl = fb.control('', Validators.required);
        this.internal_stockCtrl = fb.control('', Validators.required);


        this.editMaterialForm = fb.group({
            name: this.nameCtrl,
            code: this.codeCtrl,
            description: this.descriptionCtrl,
            price: this.priceCtrl,
            internal_stock: this.internal_stockCtrl,
            img_material: this.img_materialCtrl,
        }, {
            validator: imageFile('img_material')
        } as AbstractControlOptions);
    }

    ngOnInit(): void {
        this.getOneMaterial(this.route.snapshot.paramMap.get('idMaterial'));
    }

    getOneMaterial(idMaterial: string | null): void {
        if (idMaterial) {
            this.materialService.getOneMaterial(idMaterial).subscribe({
                next: (material: Material) => {
                    this.material = material;
                    this.editMaterialForm.setValue({
                        name: this.material.name,
                        code: this.material.code,
                        description: this.material.description,
                        price: this.material.price,
                        internal_stock: this.material.internal_stock,
                        img_material: ''
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
        if (this.editMaterialForm.value.img_material && this.editMaterialForm.value.img_material._files) {
            this.editMaterialForm.value.img_material = this.editMaterialForm.value.img_material._files[0]
            // For delete old img
            if (this.material.img_name) {
                this.editMaterialForm.value.img_name = this.material.img_name
            }
        }
        this.materialService.editMaterial(this.material.id, this.editMaterialForm.value).subscribe({
            next: () => {
                this.toastr.success('Le type de bouteille a été modifié', 'Modifier');
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
