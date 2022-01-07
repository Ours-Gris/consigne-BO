import {Role} from "./Role";
import {UserStatus} from "./user.status";
import {Address} from "./Address";
import {CollecteStatus} from "./collecte.status";

export interface User {
    sub: string;
    id: string;
    role: Role;
    status: UserStatus;
    collecte_status: CollecteStatus;
    token?: string;

    username: string;
    email: string;
    company: string;
    description: string;
    tel: string;

    address: Address;
    address_export: string;
    delivery_address: Address;
    delivery_address_export: string;

    reseller: boolean;
    producer: boolean;
    collecte_point: boolean;

    delivery_data: string;
    delivery_schedules: string;
    heavy_truck: boolean;
    stacker: boolean;
    forklift: boolean;
    pallet_truck: boolean;
    internal_data: string;

    img_user: File;
    img_original_name: string;
    img_name: string;
}
