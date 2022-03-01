import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../user/data/User";
import {OrderDataSource} from "../data/order-data-source";
import {OrderService} from "../order.service";
import Swal from "sweetalert2";
import {OrderStatus} from "../data/order.status";
import {ToastrService} from "ngx-toastr";
import {Order} from "../data/Order";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-user-order',
    templateUrl: './user-order.component.html',
    styleUrls: ['./user-order.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class UserOrderComponent implements OnInit {
    @Input() user!: User;
    @Input() isAdmin: boolean = false;
    listUserOrder!: OrderDataSource;
    totalUserOrder: number = 0;
    displayedColumns: string[] = ['createdAt', 'order_status', 'countTotal'];
    adminDisplayedColumns: string[] = ['createdAt', 'order_status', 'countTotal', 'actions'];
    expandedOrder!: Order | null;
    authUrl = environment.api_base_url;

    constructor(
        private orderService: OrderService,
        private toastr: ToastrService,
    ) {
    }

    ngOnInit(): void {
        if (this.user) {
            this.listUserOrder = new OrderDataSource(this.orderService);
            if (this.isAdmin) {
                this.displayedColumns = this.adminDisplayedColumns;
                this.listUserOrder.loadUserOrders(this.user.id)
            } else {
                this.listUserOrder.loadMyOrders()
            }
            this.countUserOrder()
        }
    }

    countUserOrder(): void {
        if (this.isAdmin) {
            this.orderService.countUserOrders(this.user.id).subscribe(
                (totalUserOrder: number) => this.totalUserOrder = totalUserOrder
            )
        } else {
            this.orderService.countMyOrders().subscribe(
                (totalUserOrder: number) => this.totalUserOrder = totalUserOrder
            )
        }
    }

    addUserOrder() {

    }

    editOrder(idUserOrder: string) {
        Swal.fire({
            title: `Modifier l'état de la commande'`,
            icon: 'question',
            input: 'select',
            inputLabel: 'Nouvelle état de la commande ?',
            inputOptions: OrderStatus,
            showConfirmButton: true,
            cancelButtonText: 'Annuler'
        }).then(
            response => {
                if (response.isConfirmed && response.value) {
                    // @ts-ignore
                    let newOrder: Partial<Order> = {order_status: OrderStatus[response.value]}
                    this.orderService.editOrder(idUserOrder, newOrder).subscribe({
                        next: () => {
                            this.countUserOrder();
                            this.listUserOrder.loadUserOrders(this.user.id);
                            this.toastr.success('La commande a été modifié', 'Modifier');
                        },
                        error: (err) => {
                            this.errorSubmit(err)
                        }
                    })
                }
            }
        )
    }

    deleteOrder(idOrder: string) {
        Swal.fire({
            title: `Supprimer la commande`,
            icon: 'warning',
            text: 'Êtes-vous sûr de vouloir supprimer cette commande?',
            showConfirmButton: true,
            confirmButtonText: 'Supprimer',
            showCancelButton: true,
            cancelButtonText: 'Annuler'
        }).then(
            (result) => {
                if (result.isConfirmed) {
                    this.orderService.deleteOrder(idOrder).subscribe({
                        next: () => {
                            this.countUserOrder();
                            this.listUserOrder.loadUserOrders(this.user.id);
                            this.toastr.success('Le passage a été supprimé', 'Supprimer');
                        },
                        error: (err) => {
                            this.errorSubmit(err)
                        }
                    })
                }
            }
        )
    }

    errorSubmit(error: string[] | string) {
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
