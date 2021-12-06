import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../user/data/User";
import {OrderDataSource} from "../data/order-data-source";
import {OrderService} from "../order.service";
import Swal from "sweetalert2";
import {DeliveryStatus} from "../data/delivery.status";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-user-order',
    templateUrl: './user-order.component.html',
    styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
    @Input() user!: User;
    @Input() isAdmin: boolean = false;
    listUserOrder!: OrderDataSource;
    totalUserOrder: number = 0;
    userDisplayedColumns: string[] = ['createdAt', 'delivery_status'];
    adminDisplayedColumns: string[] = ['createdAt', 'delivery_status', 'actions'];

    constructor(
        private orderService: OrderService,
        private toastr: ToastrService,
    ) {
    }

    ngOnInit(): void {
        if (this.user) {
            this.listUserOrder = new OrderDataSource(this.orderService);
            if (this.isAdmin) {
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
            inputOptions: DeliveryStatus,
            showConfirmButton: true,
            cancelButtonText: 'Annuler'
        }).then(
            response => {
                if (response.isConfirmed && response.value) {
                    this.orderService.editOrder(idUserOrder, {
                        delivery_status: response.value
                    }).subscribe({
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
