import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PassageUserHistoryComponent} from './passage-user-history/passage-user-history.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CollecteStatusPipe} from "../_helpers/collecte-status.pipe";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
    declarations: [
        PassageUserHistoryComponent,
        CollecteStatusPipe
    ],
    exports: [
        PassageUserHistoryComponent,
        CollecteStatusPipe
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatDividerModule
    ]
})
export class PassageModule {
}
