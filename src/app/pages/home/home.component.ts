import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    bottleWashed: number = 0;
    co2Economy: number = 0;

    constructor(
    ) {
    }

    // TODO rechercher bottleWashed et co2Economy
    ngOnInit(): void {}
}
