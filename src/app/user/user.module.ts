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
// import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import {UserService} from "./services/user.service";
import {UserRoutingModule} from "./user-routing.module";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    declarations: [
        UserAddComponent,
        UserListComponent,
        UserEditComponent
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
        // NgxMatFileInputModule,
        MatCardModule,
        MatChipsModule,
        MatTooltipModule,
        MatBadgeModule,
        MatSelectModule
    ],
    providers: [UserService]
})
export class UserModule {
}
