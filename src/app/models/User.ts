import {Role} from "./Role";

export interface User {
    id: string;
    username: string;
    email: string;
    role: Role;
    blocked: boolean;
    confirmed: boolean;
    provider: string;
    token?: string;
}
