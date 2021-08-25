import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BottleListComponent} from "./bottle-list/bottle-list.component";
import {BottleAddComponent} from "./bottle-add/bottle-add.component";
import {BottleEditComponent} from "./bottle-edit/bottle-edit.component";

const routes: Routes = [
    {
        path: '',
        component: BottleListComponent
    },
    {
        path: 'add',
        component: BottleAddComponent
    },
    {
        path: 'edit/:idBottle',
        component: BottleEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BottleRoutingModule {
}
