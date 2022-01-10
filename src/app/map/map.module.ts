import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapRoutingModule} from './map-routing.module';
import {ViewComponent} from './view/view.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MapService} from './services/map.service';
import {MarkerService} from "./services/marker.service";
import {PopupService} from "./services/popup.service";
import {StatistiqueService} from "./services/statistique.service";
import {PassageMapComponent} from './passage-map/passage-map.component';

@NgModule({
    declarations: [
        ViewComponent,
        PassageMapComponent
    ],
    imports: [
        CommonModule,
        MapRoutingModule,
        MatSidenavModule,
        MatButtonModule
    ],
    exports: [
        ViewComponent
    ],
    providers: [MapService, MarkerService, PopupService, StatistiqueService]
})
export class MapModule {
}
