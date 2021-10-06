export interface Material {
    id: string;
    name: string;
    description: string;
    price: number;
    code: string;
    internal_stock: number;

    img_material: File;
    img_original_name: string;
    img_name: string;
}
