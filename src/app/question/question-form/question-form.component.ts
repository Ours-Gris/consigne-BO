import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Question} from "../data/Question";
import {QuestionService} from "../question.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
    @Input() idQuestion!: string | null;
    classQuestion: string = 'col-md-12';
    authUrl = environment.api_base_url;
    questionForm: FormGroup;
    question!: Question;

    questionCtrl: FormControl;
    answerCtrl: FormControl;

    constructor(
        private fb: FormBuilder,
        private questionService: QuestionService,
        private toastr: ToastrService,
        public route: ActivatedRoute,
        public router: Router
    ) {
        this.questionCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.answerCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);

        this.questionForm = fb.group({
            label: this.questionCtrl,
            answer: this.answerCtrl
        })
    }

    ngOnInit(): void {
        if (this.idQuestion) {
            this.getQuestion(this.idQuestion)
        }
    }

    getQuestion(idQuestion: string): void {
        this.questionService.getOneQuestion(idQuestion).subscribe({
            next: (question: Question) => {
                this.question = question;
                this.setFormValue()
            },
            error: () => {
                this.router.navigate(['/not-found']).then();
            }
        })
    }

    setFormValue() {
        this.questionForm.setValue({
            label: this.question.label,
            answer: this.question.answer
        });
    }

    onSubmit(): void {
        if (this.idQuestion) {
            this.questionService.editQuestion(this.question.id, this.questionForm.value).subscribe({
                next: () => {
                    this.toastr.success('La question a été modifiée', 'Modifier');
                    this.router.navigateByUrl('/question').catch(err => console.error(err));
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        } else {
            this.questionService.addQuestion(this.questionForm.value).subscribe({
                next: () => {
                    this.toastr.success('La question a été ajoutée', 'Ajouter');
                    this.router.navigateByUrl('/question').catch(err => console.error(err));
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
