import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UsersDataSource} from "../data/users-data-source";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../services/user.service";
import {PassageService} from "../../passage/passage.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {fromEvent, merge} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {OrderStatus} from "../../order/data/order.status";

@Component({
  selector: 'app-user-waiting-order',
  templateUrl: './user-waiting-order.component.html',
  styleUrls: ['./user-waiting-order.component.css']
})
export class UserWaitingOrderComponent implements OnInit {
    OrderStatus = OrderStatus;
    users!: UsersDataSource;
    displayedColumns: string[] = ['order_status', 'company', 'username', 'tel', 'delivery_schedules', 'delivery_data', 'city', 'actions'];
    totalUsers: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('input') input!: ElementRef;

    constructor(
        private userService: UserService,
        private passageService: PassageService,
        private toastr: ToastrService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.users = new UsersDataSource(this.userService);
        this.users.loadUsersWaitingOrder();
    }

    ngAfterViewInit(): void {
        this.countUsersWaitingOrder();

        // server-side search
        fromEvent(this.input.nativeElement, 'keyup').pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;
                this.loadUsersWaitingOrderPage();
                this.countUsersWaitingOrder();
            })
        ).subscribe();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => {
                this.loadUsersWaitingOrderPage();
            })
        ).subscribe();
    }

    loadUsersWaitingOrderPage(): void {
        this.users.loadUsersWaitingOrder(
            this.input.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    countUsersWaitingOrder(): void {
        this.userService.countUsersWaitingOrder(
            this.input.nativeElement.value
        ).subscribe(
            (totalUsers: number) => {
                this.totalUsers = totalUsers;
            }
        )
    }

    // addPassage(idUser: string): void {
    //     Swal.fire({
    //         title: `Ajouter un passage`,
    //         icon: 'question',
    //         input: 'number',
    //         inputLabel: 'Combient de bouteilles ont été collectées ?',
    //         showConfirmButton: true,
    //         showCancelButton: true,
    //         cancelButtonText: 'Annuler'
    //     }).then(response => {
    //         if (response.isConfirmed && response.value && response.value != 0) {
    //             this.passageService.addPassage({
    //                 bottles_collected: Math.abs(response.value),
    //                 user: idUser
    //             }).subscribe({
    //                 next: () => {
    //                     this.editCollecteStatus(idUser);
    //                     this.toastr.success('Le passage a été ajouté', 'Ajouter');
    //                 },
    //                 error: (err) => {
    //                     this.errorSubmit(err)
    //                 }
    //             })
    //         }
    //     })
    // }

    editUser(idUser: string): void {
        this.router.navigate(['user', 'edit', idUser]).then();
    }

    // editOrderStatus(idUser: string): void {
    //     this.userService.editUser(idUser, {order_status: OrderStatus.}).subscribe({
    //             next: () => {
    //                 this.loadUsersWaitingPassagePage();
    //                 this.countUsersWaitingPassage();
    //                 this.toastr.success('L\'état de la collecte a été modifier', 'Modification');
    //             },
    //             error: (err) => {
    //                 this.errorSubmit(err)
    //             }
    //         }
    //     )
    // }

    errorSubmit(error: string[] | string): void {
        console.error(error);
        if (Array.isArray(error)) {
            error.map((err: string) => {
                this.toastr.error(err, 'Error !');
            })
        } else {
            this.toastr.error(error, 'Error !');
        }
    }
}
