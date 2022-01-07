import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user/services/user.service";

@Component({
    selector: 'app-producer-list',
    templateUrl: './producer-list.component.html',
    styleUrls: ['./producer-list.component.css']
})
export class ProducerListComponent implements OnInit {
    nbrProducer: number = 0;

    constructor(
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.countProducers()
    }

    countProducers() {
        this.userService.countProducers().subscribe(
            (number) => {
                this.nbrProducer = number
            },
            error => {
                console.error(error)
            }
        )
    }
}
