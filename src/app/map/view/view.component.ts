import {AfterViewInit, Component} from '@angular/core';
import {MapService} from '../services/map.service';
import {UserService} from "../../user/services/user.service";

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
})
export class ViewComponent implements AfterViewInit {

    constructor(
        private mapServices: MapService,
        private userService: UserService,

    ) {}

    ngAfterViewInit(): void {
        this.createMap();
    }

    createMap(): void {
        this.userService.getMe().subscribe(
            users => {
                console.log(users)
            }
        )
    }
}
