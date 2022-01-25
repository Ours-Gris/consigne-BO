import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {NgxMasonryOptions} from "ngx-masonry";
import {Material} from "../data/Material";
import {MaterialService} from "../material.service";

@Component({
    selector: 'app-material-gallery-mini',
    templateUrl: './material-gallery-mini.component.html',
    styleUrls: ['./material-gallery-mini.component.css']
})
export class MaterialGalleryMiniComponent implements OnInit {
    materials: Material[] = [];
    authUrl = environment.api_base_url;
    nbrMaterialsTotal: number = 20
    public masonryOptions: NgxMasonryOptions = {
        columnWidth: '.masonry-item',
        itemSelector: '.masonry-item',
        fitWidth: true,
        gutter: 10,
        resize: true,
        initLayout: true,
        horizontalOrder: true
    };

    constructor(
        private materialService: MaterialService
    ) {
    }

    ngOnInit(): void {
        this.getUsers()
    }

    getUsers(filter?: string, start: number = 0, sortBy: string = 'createdAt', sortDirection: string = 'DESC', nbr: number = 20) {
        this.materialService.getMaterials(filter, sortBy, sortDirection, start, nbr).subscribe(
            (materials) => {
                this.materials.push(...materials)
            },
            error => {
                console.error(error)
            }
        )
    }

    onScroll() {
        const startUser: number = this.nbrMaterialsTotal;
        this.nbrMaterialsTotal += 20;
        this.getUsers('', startUser)
    }
}
