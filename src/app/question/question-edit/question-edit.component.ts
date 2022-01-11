import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-question-edit',
    templateUrl: './question-edit.component.html',
    styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
    idQuestion!: string | null;

    constructor(
        public route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.idQuestion = this.route.snapshot.paramMap.get('idQuestion')
    }
}
