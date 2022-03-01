import {Pipe, PipeTransform} from '@angular/core';
import {Item} from "../order/data/Item";

@Pipe({
    name: 'countTotal'
})
export class CountTotalPipe implements PipeTransform {
    transform(value: Item[], ...args: unknown[]): number {
        let total: number = 0;
        value.map(
            item => {
                total += item.price * item.quantity
            }
        );
        return total;
    }
}
