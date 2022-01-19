import {User} from "../../user/data/User";
import {OrderStatus} from "./order.status";
import {Material} from "../../material/data/Material";

export interface Order {
    id: string;
    order_status: OrderStatus;
    createdAt: string;

    material: Material;
    user: User;
}
