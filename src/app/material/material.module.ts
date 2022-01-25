import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialRoutingModule} from './material-routing.module';
import {MaterialAddComponent} from './material-add/material-add.component';
import {MaterialEditComponent} from './material-edit/material-edit.component';
import {MaterialListComponent} from './material-list/material-list.component';
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {MaterialFormComponent} from './material-form/material-form.component';
import {MaterialGalleryMiniComponent} from './material-gallery-mini/material-gallery-mini.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {NgxMasonryModule} from "ngx-masonry";
import {MatCardModule} from "@angular/material/card";
import {MaterialPresentationComponent} from './material-presentation/material-presentation.component';

@NgModule({
    declarations: [
        MaterialAddComponent,
        MaterialEditComponent,
        MaterialListComponent,
        MaterialFormComponent,
        MaterialGalleryMiniComponent,
        MaterialPresentationComponent
    ],
    exports: [
        MaterialGalleryMiniComponent
    ],
    imports: [
        CommonModule,
        MaterialRoutingModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        MaterialFileInputModule,
        InfiniteScrollModule,
        NgxMasonryModule,
        MatCardModule
    ]
})
export class MaterialModule {
}
