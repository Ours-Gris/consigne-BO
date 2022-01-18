import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionAddComponent} from './question-add/question-add.component';
import {QuestionEditComponent} from './question-edit/question-edit.component';
import {QuestionFormComponent} from './question-form/question-form.component';
import {QuestionListComponent} from './question-list/question-list.component';
import {QuestionRoutingModule} from "./question-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqMiniListComponent } from './faq-mini-list/faq-mini-list.component';
import {MatCardModule} from "@angular/material/card";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
    declarations: [
        QuestionAddComponent,
        QuestionEditComponent,
        QuestionFormComponent,
        QuestionListComponent,
        FaqListComponent,
        FaqMiniListComponent
    ],
    exports: [
        FaqMiniListComponent,
        FaqListComponent
    ],
    imports: [
        CommonModule,
        QuestionRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        MatProgressBarModule,
        MatCardModule,
        InfiniteScrollModule
    ]
})
export class QuestionModule {
}
