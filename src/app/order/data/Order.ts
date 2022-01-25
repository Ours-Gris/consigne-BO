import {User} from "../../user/data/User";
import {OrderStatus} from "./order.status";
import {Item} from "./Item";

export interface Order {
    id?: string;
    order_status: OrderStatus;
    createdAt?: string;

    items: Item[];
    user: User | string;
}
