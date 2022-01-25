import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsRoutingModule} from './news-routing.module';
import {NewsAddComponent} from './news-add/news-add.component';
import {NewsEditComponent} from './news-edit/news-edit.component';
import {NewsListComponent} from './news-list/news-list.component';
import {NewsFormComponent} from './news-form/news-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NewsPublicListComponent} from './news-public-list/news-public-list.component';
import {NewsPublicMiniListComponent} from './news-public-mini-list/news-public-mini-list.component';
import {MatCardModule} from "@angular/material/card";
import {AngularEditorModule} from "@kolkov/angular-editor";

@NgModule({
    declarations: [
        NewsAddComponent,
        NewsEditComponent,
        NewsListComponent,
        NewsFormComponent,
        NewsPublicListComponent,
        NewsPublicMiniListComponent
    ],
    exports: [
        NewsPublicMiniListComponent,
        NewsPublicListComponent
    ],
    imports: [
        CommonModule,
        NewsRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MaterialFileInputModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatSortModule,
        MatProgressBarModule,
        MatPaginatorModule,
        MatCardModule,
        AngularEditorModule
    ]
})
export class NewsModule {
}
