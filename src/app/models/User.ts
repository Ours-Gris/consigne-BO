import {Role} from "./Role";

export interface User {
    id: string;
    username: string;
    email: string;
    role: Role;
    token?: string;
}
