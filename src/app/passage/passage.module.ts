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
import { BottleCollectedChartComponent } from './bottle-collected-chart/bottle-collected-chart.component';
import { ChartModule } from 'angular-highcharts';


@NgModule({
    declarations: [
        PassageUserHistoryComponent,
        CollecteStatusPipe,
        BottleCollectedChartComponent
    ],
    exports: [
        PassageUserHistoryComponent,
        CollecteStatusPipe,
        BottleCollectedChartComponent
    ],
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatDividerModule,
        ChartModule
    ]
})
export class PassageModule {
}
