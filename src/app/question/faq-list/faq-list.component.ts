import { Component, OnInit } from '@angular/core';
import {Question} from "../data/Question";
import {QuestionService} from "../question.service";

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {
    questions: Question[] = [];

    constructor(
        private questionService: QuestionService,
    ) {
    }

    ngOnInit(): void {
        this.getQuestion()
    }

    getQuestion(filter?: string, startUser: number = 0, sortBy: string = 'createdAt', sortDirection: string = 'DESC', nbrUsers: number = 50) {
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
