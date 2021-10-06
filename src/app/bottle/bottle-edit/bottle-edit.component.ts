import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-bottle-edit',
    templateUrl: './bottle-edit.component.html',
    styleUrls: ['./bottle-edit.component.css']
})
export class BottleEditComponent implements OnInit {
    idBottle!: string | null;

    constructor(
        public route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.idBottle = this.route.snapshot.paramMap.get('idBottle');
    }
}
