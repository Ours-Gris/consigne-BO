import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollecteRoutingModule} from './collecte-routing.module';
import {CollecteListComponent} from './collecte-list/collecte-list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";
import {CollecteHistoryComponent} from './collecte-history/collecte-history.component';
import {MatChipsModule} from "@angular/material/chips";
import {NgbButtonsModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
    declarations: [
        CollecteListComponent,
        CollecteHistoryComponent
    ],
    exports: [
        CollecteHistoryComponent
    ],
    imports: [
        CommonModule,
        CollecteRoutingModule,
        MatButtonModule,
        MatProgressBarModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        MatSortModule,
        MatChipsModule,
        NgbButtonsModule
    ]
})
export class CollecteModule {
}
