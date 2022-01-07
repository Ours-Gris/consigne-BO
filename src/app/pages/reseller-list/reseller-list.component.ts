import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user/services/user.service";

@Component({
    selector: 'app-reseller-list',
    templateUrl: './reseller-list.component.html',
    styleUrls: ['./reseller-list.component.css']
})
export class ResellerListComponent implements OnInit {
    nbrReseller: number = 0;

    constructor(
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.countResellers()
    }

    countResellers() {
        this.userService.countResellers().subscribe(
            (number) => {
                this.nbrReseller = number
            },
            error => {
                console.error(error)
            }
        )
    }
}
