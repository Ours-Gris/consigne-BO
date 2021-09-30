import {Role} from "./Role";
import {UserStatus} from "./user.status";
import {Address} from "./Address";

export interface User {
    sub: string;
    id: string;
    role: Role;
    status: UserStatus;
    token?: string;

    username: string;
    email: string;
    company: string;
    tel: string;

    address: Address;
    address_export: string;
    delivery_address: Address;
    delivery_address_export: string;

    reseller: boolean;
    producer: boolean;

    delivery_data: string;
    delivery_schedules: string;
    heavy_truck: boolean;
    stacker: boolean;
    forklift: boolean;
    pallet_truck: boolean;

    internal_data: string;
}
