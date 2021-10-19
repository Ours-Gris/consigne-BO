import {Pipe, PipeTransform} from '@angular/core';
import {CollecteStatus} from "../user/data/collecte.status";

@Pipe({
    name: 'collecteStatus'
})
export class CollecteStatusPipe implements PipeTransform {

    transform(value: string, ...args: unknown[]): string {
        switch (value) {
            case CollecteStatus.NO_COLLECTE: {
                value = 'Pas de collecte';
                break
            }
            case CollecteStatus.IN_FILLING: {
                value = 'Collecte en cours';
                break
            }
            case CollecteStatus.ALMOST_FULL: {
                value = 'Remplis à 80%';
                break
            }
            case CollecteStatus.FULL: {
                value = 'Remplis à 100%';
                break
            }
        }
        return value;
    }

}
