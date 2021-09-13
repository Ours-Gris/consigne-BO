import {Role} from "./Role";
import {UserStatus} from "./user.status";

export interface User {
    sub: string;
    id: string;
    username: string;
    email: string;
    company: string;
    adress: string;
    adress_details: string;
    postal_code: string;
    city: string;
    tel: string;
    role: Role;
    status: UserStatus;
    token?: string;
    reseller?: boolean;
    producer?: boolean;
}
