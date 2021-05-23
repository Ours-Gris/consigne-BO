import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapRoutingModule} from './map-routing.module';
import {ViewComponent} from './view/view.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MapService} from './services/map.service';


@NgModule({
    declarations: [
        ViewComponent
    ],
    imports: [
        CommonModule,
        MapRoutingModule,
        MatSidenavModule,
        MatButtonModule
    ],
    providers: [MapService]
})
export class MapModule {
}
