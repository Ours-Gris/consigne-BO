import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewComponent} from './view/view.component';
import {PassageMapComponent} from "./passage-map/passage-map.component";
import {AuthGuard} from "../_helpers/auth.guard";
import {Role} from "../user/data/Role";

const routes: Routes = [
    {
        path: '',
        component: ViewComponent
    }, {
        path: 'passage',
        canActivate: [AuthGuard],
        data: {roles: [Role.ADMIN]},
        component: PassageMapComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule {
}
