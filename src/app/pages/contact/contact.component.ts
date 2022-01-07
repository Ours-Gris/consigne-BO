import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ContactService} from "../../shared/services/contact.service";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    contactForm!: FormGroup;
    nameCtrl!: FormControl;
    emailCtrl!: FormControl;
    messageCtrl!: FormControl;


    constructor(
        private contactService: ContactService,
        private fb: FormBuilder,
        private toastr: ToastrService,
    ) {
        this.nameCtrl = fb.control('', [Validators.required]);
        this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
        this.messageCtrl = fb.control('', [Validators.required, Validators.minLength(6)]);

        this.contactForm = fb.group({
            name: this.nameCtrl,
            email: this.emailCtrl,
            message: this.messageCtrl
        })
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.contactService.sandMessage(this.contactForm.value).subscribe({
            next: () => {
                this.toastr.success('Message envoyé');
                this.contactForm.reset()
            },
            error: (error) => {
                console.error(error);
                if (Array.isArray(error)) {
                    error.map((err: string) => {
                        this.toastr.error(err, 'Error !');
                    })
                } else {
                    this.toastr.error(error, 'Error !');
                }
            }
        })
    }
}
