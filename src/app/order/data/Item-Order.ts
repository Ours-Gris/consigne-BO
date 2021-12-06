import {Material} from "../../material/data/Material";

export interface ItemOrder {
    id: string;
    quantity: number;

    material: Material;
}
