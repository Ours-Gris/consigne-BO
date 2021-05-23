export interface User {
    id: number;
    username: string;
    email: string;
    blocked: boolean;
    confirmed: boolean;
    provider: string;
}
