import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-material-edit',
    templateUrl: './material-edit.component.html',
    styleUrls: ['./material-edit.component.css']
})
export class MaterialEditComponent implements OnInit {
    idMaterial!: string | null;

    constructor(
        public route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.idMaterial = this.route.snapshot.paramMap.get('idMaterial')
    }
}
