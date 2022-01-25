import {Order} from "./Order";
import {Material} from "../../material/data/Material";

export interface Item {
    id?: string;
    price: number;
    quantity: number;

    material: Material | string;
    order?: Order;
}
