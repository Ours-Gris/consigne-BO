import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapComponent} from "../pages/map/map.component";
import {PassageMapComponent} from "./passage-map/passage-map.component";

const routes: Routes = [
    {
        path: '',
        component: MapComponent
    }, {
        path: 'passage',
        component: PassageMapComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule {
}
