import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PassagePendingComponent} from "./passage-pending/passage-pending.component";

const routes: Routes = [
    {
        path: '',
        component: PassagePendingComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PassageRoutingModule {
}
