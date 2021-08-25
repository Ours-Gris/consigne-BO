import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-producers-list',
    templateUrl: './producers-list.component.html',
    styleUrls: ['./producers-list.component.css']
})
export class ProducersListComponent implements OnInit {
    listProducers = [
        {
            logo: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/11/attachment_32513332-e1509431053897.jpg?auto=format&q=60&fit=max&w=930',
            company: 'Brasserie de foufou',
            link: 'https://www.google.fr/',
            city: 'Montpellier'
        }, {
            logo: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/11/attachment_42900922-e1509431072571.jpg?auto=format&q=60&fit=max&w=930',
            company: 'Brasserie de sage',
            link: 'https://www.google.fr/',
            city: 'Bordeaux'
        }, {
            logo: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/11/attachment_52924407-e1509431090413.jpg?auto=format&q=60&fit=max&w=930',
            company: 'Brasserie de sage',
            link: 'https://www.google.fr/',
            city: 'Meze'
        }, {
            logo: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/11/attachment_32513332-e1509431053897.jpg?auto=format&q=60&fit=max&w=930',
            company: 'Brasserie de foufou',
            link: 'https://www.google.fr/',
            city: 'Montpellier'
        }, {
            logo: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/11/attachment_42900922-e1509431072571.jpg?auto=format&q=60&fit=max&w=930',
            company: 'Brasserie de sage',
            link: 'https://www.google.fr/',
            city: 'Montpellier'
        }, {
            logo: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/11/attachment_52924407-e1509431090413.jpg?auto=format&q=60&fit=max&w=930',
            company: 'Brasserie de sage',
            link: 'https://www.google.fr/',
            city: 'Montpellier'
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
