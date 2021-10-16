import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollecteListComponent} from "./collecte-list/collecte-list.component";

const routes: Routes = [
    {
        path: '',
        component: CollecteListComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CollecteRoutingModule {
}
