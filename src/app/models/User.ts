import {Role} from "./Role";

export interface User {
    sub: string;
    id: string;
    username: string;
    email: string;
    role: Role;
    token?: string;
}
