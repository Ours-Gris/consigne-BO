import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BottleRoutingModule} from './bottle-routing.module';
import {BottleListComponent} from "./bottle-list/bottle-list.component";
import {BottleAddComponent} from "./bottle-add/bottle-add.component";
import {BottleEditComponent} from "./bottle-edit/bottle-edit.component";
import {BottleService} from "./services/bottle.service";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        BottleListComponent,
        BottleAddComponent,
        BottleEditComponent
    ],
    imports: [
        CommonModule,
        BottleRoutingModule,
        MatTableModule,
        MatSortModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    providers: [
        BottleService
    ]
})
export class BottleModule {
}
