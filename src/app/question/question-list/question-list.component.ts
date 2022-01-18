import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {QuestionsDataSource} from "../data/questions-data-source";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {QuestionService} from "../question.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
    questions!: QuestionsDataSource;
    displayedColumns: string[] = ['label', 'answer','actions'];
    totalQuestions: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('input') input!: ElementRef;

    constructor(
        private questionService: QuestionService,
        private toastr: ToastrService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.questions = new QuestionsDataSource(this.questionService);
        this.questions.loadQuestions();
    }

    ngAfterViewInit(): void {
        this.countAllQuestions();

        // server-side search
        fromEvent(this.input.nativeElement, 'keyup').pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadQuestionsPage();
                this.countAllQuestions();
            })
        ).subscribe();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => {
                this.loadQuestionsPage();
            })
        ).subscribe();
    }

    loadQuestionsPage(): void {
        this.questions.loadQuestions(
            this.input.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    countAllQuestions(): void {
        this.questionService.countAllQuestions(
            this.input.nativeElement.value
        ).subscribe(
            (totalQuestions: number) => {
                this.totalQuestions = totalQuestions;
            }
        );
    }

    editQuestion(idQuestion: string): void {
        this.router.navigate(['question', 'edit', idQuestion]).then();
    }

    deleteQuestion(idQuestion: string): void {
        Swal.fire({
            title: `Supprimer cette question`,
            icon: 'warning',
            text: 'Êtes-vous sûr de vouloir supprimer cette question ?',
            showConfirmButton: true,
            confirmButtonText: 'Supprimer',
            showCancelButton: true,
            cancelButtonText: 'Annuler'
        }).then(
            (result) => {
                if (result.isConfirmed) {
                    this.questionService.deleteQuestion(idQuestion).subscribe({
                        next: () => {
                            this.loadQuestionsPage();
                            this.countAllQuestions();
                            this.toastr.success('La question a été supprimé', 'Supprimer');
                        },
                        error: (err) => {
                            this.errorSubmit(err)
                        }
                    })
                }
            }
        )
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
