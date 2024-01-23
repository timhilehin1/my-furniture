export interface cartInterface{
    productImage: {
        imageUrl: string;
        caption: string;
        attribution?: string;
    };
    productName: string;
    productPrice: number;
    productQuantity: number;
    productSize: string;
    productColor: string;
    _id: string;
    total: number;
}