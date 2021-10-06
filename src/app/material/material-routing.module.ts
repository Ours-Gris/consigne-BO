import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MaterialListComponent} from "./material-list/material-list.component";
import {MaterialAddComponent} from "./material-add/material-add.component";
import {MaterialEditComponent} from "./material-edit/material-edit.component";

const routes: Routes = [
    {
        path: '',
        component: MaterialListComponent
    },
    {
        path: 'add',
        component: MaterialAddComponent
    },
    {
        path: 'edit/:idMaterial',
        component: MaterialEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaterialRoutingModule {
}
