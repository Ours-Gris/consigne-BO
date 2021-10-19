import {User} from "../../user/data/User";

export interface Passage {
    id?: string;
    bottles_collected: number;
    user: User | string;
}
