import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAddComponent} from "./user-add/user-add.component";
import {UserListComponent} from './user-list/user-list.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatChipsModule} from "@angular/material/chips";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {UserService} from "./services/user.service";
import {UserRoutingModule} from "./user-routing.module";
import {MatSelectModule} from "@angular/material/select";
import {ProfilComponent} from './profil/profil.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDividerModule} from "@angular/material/divider";
import {UserFormComponent} from './user-form/user-form.component';
import {PassageModule} from "../passage/passage.module";
import {UserWaitingPassageComponent} from './user-waiting-passage/user-waiting-passage.component';
import {MaterialModule} from "../material/material.module";
import {OrderModule} from "../order/order.module";

@NgModule({
    declarations: [
        UserAddComponent,
        UserListComponent,
        UserEditComponent,
        ProfilComponent,
        UserFormComponent,
        UserWaitingPassageComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatProgressBarModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatChipsModule,
        MatTooltipModule,
        MatBadgeModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatDividerModule,
        PassageModule,
        MaterialModule,
        OrderModule
    ],
    providers: [UserService],
    exports: [ProfilComponent]
})
export class UserModule {
}
