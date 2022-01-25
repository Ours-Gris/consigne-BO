import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderRoutingModule} from './order-routing.module';
import {UserOrderComponent} from './user-order/user-order.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {OrderStatusPipe} from "../_helpers/order-status.pipe";
import {MatDividerModule} from "@angular/material/divider";
import {OrderListComponent} from './order-list/order-list.component';
import {MaterialModule} from "../material/material.module";

@NgModule({
    declarations: [
        UserOrderComponent,
        OrderStatusPipe,
        OrderListComponent
    ],
    exports: [
        UserOrderComponent,
        OrderStatusPipe
    ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatButtonModule,
        MatSortModule,
        MatDividerModule,
        MaterialModule
    ]
})
export class OrderModule {
}
