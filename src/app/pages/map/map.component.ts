import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../user/data/User";
import {UserService} from "../../user/services/user.service";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    producer: boolean = false;
    reseller: boolean = false;
    users: User[] = [];

    constructor(
        private userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this.getUsers()
    }

    getUsers() {
        this.userService.getAllPublicUser().subscribe(
            (users) => {
                this.users.push(...users)
            },
            error => {
                console.error(error)
            }
        )
    }

}
