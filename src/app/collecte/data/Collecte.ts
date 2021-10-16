import {CollecteStatus} from "./collecte.status";
import {User} from "../../user/data/User";

export interface Collecte {
    id?: string;
    status: CollecteStatus;
    user: User | string;
}
