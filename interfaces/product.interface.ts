
export interface ProductInterface {
    productName: string;
    ProductPrice: number;
    discountStatus?: boolean;
    discountPrice?: number;
    productDescription?: string;
    availabilityStatus: boolean;
    productCategory:[];
    productSize?: [];
    slug?: string;
    productImages: [];
}