import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {merge} from "rxjs";
import {tap} from "rxjs/operators";
import {OrderService} from "../order.service";
import {OrderStatus} from "../data/order.status";
import {OrderDataSource} from "../data/order-data-source";
import Swal from "sweetalert2";

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
    OrderStatus = OrderStatus;
    orders!: OrderDataSource;
    displayedColumns: string[] = ['createdAt', 'order_status', 'company', 'username', 'tel', 'delivery_schedules', 'delivery_data', 'actions'];
    totalOrders: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    // @ViewChild('input') input!: ElementRef;

    constructor(
        private orderService: OrderService,
        private toastr: ToastrService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.orders = new OrderDataSource(this.orderService);
        this.orders.loadAllOrders();
    }

    ngAfterViewInit(): void {
        this.countAllOrders();

        // server-side search
        // fromEvent(this.input.nativeElement, 'keyup').pipe(
        //     debounceTime(500),
        //     distinctUntilChanged(),
        //     tap(() => {
        //         this.paginator.pageIndex = 0;
        //         this.loadAllOrderPage();
        //         this.countAllOrders();
        //     })
        // ).subscribe();

        // reset the paginator after sorting
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => {
                this.loadAllOrderPage();
            })
        ).subscribe();
    }

    loadAllOrderPage(): void {
        this.orders.loadAllOrders(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    countAllOrders(): void {
        this.orderService.countAllOrders().subscribe(
            (totalOrders: number) => {
                this.totalOrders = totalOrders;
            }
        )
    }

    validOrder(idOrder: string): void {
        Swal.fire({
            title: `Valider la commande`,
            icon: 'question',
            text: 'Êtes-vous sûr de vouloir valider la commande ?',
            showConfirmButton: true,
            confirmButtonText: 'Valider',
            showCancelButton: true,
            cancelButtonText: 'Annuler'
        }).then(response => {
            if (response.isConfirmed) {
                this.orderService.editOrder(idOrder, {order_status: OrderStatus.PENDING_DELIVERY}).subscribe({
                        next: () => {
                            this.loadAllOrderPage();
                            this.countAllOrders();
                            this.toastr.success('L\'état de la commande a été modifier', 'Modification');
                        },
                        error: (err) => {
                            this.errorSubmit(err)
                        }
                    }
                )
            }
        })
    }

    validDelivery(idOrder: string): void {
        Swal.fire({
            title: `Valider la livraison`,
            icon: 'question',
            text: 'Êtes-vous sûr de vouloir valider la livraison ?',
            showConfirmButton: true,
            confirmButtonText: 'Valider',
            showCancelButton: true,
            cancelButtonText: 'Annuler'
        }).then(response => {
            if (response.isConfirmed) {
                this.orderService.editOrder(idOrder, {order_status: OrderStatus.PENDING_PAYMENT}).subscribe({
                        next: () => {
                            this.loadAllOrderPage();
                            this.countAllOrders();
                            this.toastr.success('L\'état de la commande a été modifier', 'Modification');
                        },
                        error: (err) => {
                            this.errorSubmit(err)
                        }
                    }
                )
            }
        })
    }

    validPayment(idOrder: string): void {
        Swal.fire({
            title: `Valider le payment`,
            icon: 'question',
            text: 'Êtes-vous sûr de vouloir valider le payment ?',
            showConfirmButton: true,
            confirmButtonText: 'Valider',
            showCancelButton: true,
            cancelButtonText: 'Annuler'
        }).then(response => {
            if (response.isConfirmed) {
                this.orderService.editOrder(idOrder, {order_status: OrderStatus.COMPLETE}).subscribe({
                        next: () => {
                            this.loadAllOrderPage();
                            this.countAllOrders();
                            this.toastr.success('L\'état de la commande a été modifier', 'Modification');
                        },
                        error: (err) => {
                            this.errorSubmit(err)
                        }
                    }
                )
            }
        })
    }

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
