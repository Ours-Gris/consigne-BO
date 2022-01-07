import {Component, OnInit} from '@angular/core';
import {User} from "../data/User";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: 'app-user-presentation',
    templateUrl: './user-presentation.component.html',
    styleUrls: ['./user-presentation.component.css']
})
export class UserPresentationComponent implements OnInit {
    //TODO ça va pas marcher en prod
    authUrl = environment.api_base_url;
    user!: User;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private titleService: Title,
        private metaService: Meta,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        const idUser = this.route.snapshot.paramMap.get('idUser');
        if (idUser) {
            this.getUser(idUser)
        }
    }

    getUser(idUser: string): void {
        this.userService.getOnePublicUser(idUser).subscribe({
            next: (user: User) => {
                this.user = user;
            },
            error: () => {
                this.router.navigate(['/not-found']).then()
            },
            complete: () => {
                // this.titleService.setTitle(this.user.company);
                // this.metaService.updateTag({
                //     property: 'og:image',
                //     content: this.authUrl + '/users/file/' + this.user.img_name
                // });
                // this.metaService.updateTag({
                //     property: 'og:type',
                //     content: 'website'
                // });
                // this.metaService.updateTag({
                //     property: 'og:title',
                //     content: this.user.name
                // });
                // this.metaService.updateTag({
                //     property: 'og:url ',
                //     content: window.location.href
                // });
                // this.metaService.updateTag({
                //     property: 'og:description  ',
                //     content: this.user.description
                // });
            }
        })
    }
}
