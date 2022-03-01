import {Pipe, PipeTransform} from '@angular/core';
import {OrderStatus} from "../order/data/order.status";

@Pipe({
    name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

    transform(value: string, ...args: unknown[]): string {
        switch (value) {
            case OrderStatus.PENDING_VALIDATION: {
                value = 'Validation';
                break
            }
            case OrderStatus.PENDING_DELIVERY: {
                value = 'Livraison';
                break
            }
            case OrderStatus.PENDING_PAYMENT: {
                value = 'Paiement';
                break
            }
            case OrderStatus.COMPLETE: {
                value = 'Terminée';
                break
            }
            case OrderStatus.CANCELLED: {
                value = 'Annulée';
                break
            }
        }
        return value;
    }

}
