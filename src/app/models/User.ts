export interface User {
    _id: string;
    username: string;
    email: string;
    blocked: boolean;
    confirmed: boolean;
    provider: string;
}
