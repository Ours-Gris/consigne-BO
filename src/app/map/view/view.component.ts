import {AfterViewInit, Component} from '@angular/core';
import {MapService} from '../services/map.service';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
})
export class ViewComponent implements AfterViewInit {

    constructor(
        private mapServices: MapService
    ) {}

    ngAfterViewInit(): void {
        this.createMap();
    }

    createMap(): void {

    }
}
