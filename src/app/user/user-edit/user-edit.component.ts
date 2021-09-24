import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    idUser!: string | null;

    constructor(
        public router: Router,
        public route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.idUser = this.route.snapshot.paramMap.get('idUser');
    }
}
