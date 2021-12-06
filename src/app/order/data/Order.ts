import {User} from "../../user/data/User";
import {DeliveryStatus} from "./delivery.status";

export interface Order {
    id: string;
    delivery_status: DeliveryStatus;

    user: User;
}
