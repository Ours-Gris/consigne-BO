import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {NgxMasonryOptions} from "ngx-masonry";
import {UserService} from "../../../user/services/user.service";
import {User} from "../../../user/data/User";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit {
    @ViewChild('searchInput') searchInput!: ElementRef;

    @Input() producer: boolean = false;
    @Input() reseller: boolean = false;
    users: User[] = [];
    authUrl = environment.api_base_url;
    nbrUsersTotal: number = 20
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
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.getUsers()
    }

    ngAfterViewInit(): void {
        // server-side search
        fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => {
                this.users = [];
                this.getUsers(this.searchInput.nativeElement.value);
            })
        ).subscribe();
    }

    getUsers(filter?: string, startUser: number = 0, sortBy: string = 'createdAt', sortDirection: string = 'DESC', nbrUsers: number = 20) {
        if (this.producer) {
            this.userService.getProducers(filter, sortBy, sortDirection, startUser, nbrUsers).subscribe(
                (users) => {
                    this.users.push(...users)
                },
                error => {
                    console.error(error)
                }
            )
        } else if (this.reseller) {
            this.userService.getResellers(filter, sortBy, sortDirection, startUser, nbrUsers).subscribe(
                (users) => {
                    this.users.push(...users)
                },
                error => {
                    console.error(error)
                }
            )
        }
    }

    onScroll() {
        const startUser: number = this.nbrUsersTotal;
        this.nbrUsersTotal += 20;
        this.getUsers('', startUser)
    }
}
