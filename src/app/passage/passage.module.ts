import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PassageUserHistoryComponent} from './passage-user-history/passage-user-history.component';
import {PassagePendingComponent} from './passage-pending/passage-pending.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CollecteStatusPipe} from "../_helpers/collecte-status.pipe";

@NgModule({
    declarations: [
        PassageUserHistoryComponent,
        PassagePendingComponent,
        CollecteStatusPipe
    ],
    exports: [
        PassageUserHistoryComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressBarModule
    ]
})
export class PassageModule {
}
