import {Role} from "./role";

export interface User {
    _id: string;
    username: string;
    email: string;
    role: Role;
    blocked: boolean;
    confirmed: boolean;
    provider: string;
    token?: string;
}
