export interface Bottle {
    id: string;
    name: string;
    description: string;
    price: number;
    code: string;
    nbr_by_palette: number;
    internal_stock: number;

    img_bottle: File;
    img_original_name: string;
    img_name: string;

    pdf_bottle: File;
    pdf_original_name: string;
    pdf_name: string;
}
