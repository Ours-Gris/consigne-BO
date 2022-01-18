import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../question.service";
import {Question} from "../data/Question";

@Component({
    selector: 'app-faq-mini-list',
    templateUrl: './faq-mini-list.component.html',
    styleUrls: ['./faq-mini-list.component.css']
})
export class FaqMiniListComponent implements OnInit {
    questions: Question[] = [];

    constructor(
        private questionService: QuestionService,
    ) {
    }

    ngOnInit(): void {
        this.getQuestion('', 0, 'createdAt', 'DESC', 3)
    }

    getQuestion(filter?: string, startUser: number = 0, sortBy: string = 'createdAt', sortDirection: string = 'DESC', nbrUsers: number = 20) {
        this.questionService.getQuestions(filter, sortBy, sortDirection, startUser, nbrUsers).subscribe(
            (questions) => {
                this.questions.push(...questions)
            },
            error => {
                console.error(error)
            }
        )
    }
}
