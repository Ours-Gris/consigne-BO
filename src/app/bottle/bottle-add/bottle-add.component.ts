import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {BottleService} from "../services/bottle.service";

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

    constructor(
        private fb: FormBuilder,
        private bottleService: BottleService,
        private toastr: ToastrService,
        public router: Router
    ) {
        this.nameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.codeCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.descriptionCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);

        this.addBottleForm = fb.group({
            name: this.nameCtrl,
            code: this.codeCtrl,
            description: this.descriptionCtrl
        });
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.bottleService.addBottle(this.addBottleForm.value).subscribe({
            next: () => {
                this.toastr.success('Le type de bouteille a été ajouté', 'Ajouter');
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
