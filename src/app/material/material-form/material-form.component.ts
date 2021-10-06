import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Material} from "../data/Material";
import {MaterialService} from "../services/material.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {FileValidator} from "ngx-material-file-input";
import {imageFile} from "../../shared/image-file.validator";

@Component({
    selector: 'app-material-form',
    templateUrl: './material-form.component.html',
    styleUrls: ['./material-form.component.css']
})
export class MaterialFormComponent implements OnInit {
    @Input() idMaterial!: string | null;
    classMaterial: string = 'col-md-12';
    authUrl = environment.api_base_url;
    materialForm: FormGroup;
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


        this.materialForm = fb.group({
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
        if (this.idMaterial) {
            this.classMaterial = 'col-md-6';
            this.getMaterial(this.idMaterial)
        }
    }

    getMaterial(idMaterial: string): void {
        this.materialService.getOneMaterial(idMaterial).subscribe({
            next: (material: Material) => {
                this.material = material;
                this.setFormValue()
            },
            error: error => {
                console.error(error);
                this.router.navigate(['/not-found']).then();
            }
        });
    }

    setFormValue() {
        this.materialForm.setValue({
            name: this.material.name,
            code: this.material.code,
            description: this.material.description,
            price: this.material.price,
            internal_stock: this.material.internal_stock,
            img_material: ''
        });
    }

    onSubmit(): void {
        if (this.materialForm.value.img_material && this.materialForm.value.img_material._files) {
            this.materialForm.value.img_material = this.materialForm.value.img_material._files[0]
            // For delete old img
            if (this.material && this.material.img_name) {
                this.materialForm.value.img_name = this.material.img_name
            }
        }
        if (this.idMaterial) {
            this.materialService.editMaterial(this.material.id, this.materialForm.value).subscribe({
                next: () => {
                    this.toastr.success('Le type de bouteille a été modifié', 'Modifier');
                    this.router.navigateByUrl('/material').catch(err => console.error(err));
                },
                error: this.errorSubmit
            })
        } else {
            this.materialService.addMaterial(this.materialForm.value).subscribe({
                next: () => {
                    this.toastr.success('Le type de matériel a été ajouté', 'Ajouter');
                    this.router.navigateByUrl('/material').catch(err => console.error(err));
                },
                error: this.errorSubmit
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
