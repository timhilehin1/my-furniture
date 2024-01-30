
export interface imageInterface {
	imageUrl: string;
	caption: string;
	attribution: string;
}

export interface ProductSectionInterface {
	sectionName: string;
}

export interface ProductCategoryInterface{
	categoryName: string;
	categorySlug?: string;
}

export interface ProductSizeInterface {
	sizeName: string;
	abbreviation: string;
}

export interface ProductColorInterface {
	colorName: string;
	colorCode: string;
}

export interface ProductCardInterface {
	discountStatus?: boolean;
	discountPrice?: number;
	productPrice: number;
	productImages: imageInterface[];
	productName: string;
	_id: string;
	slug?: string;
	handleAddToWishlist: (item: any) => void;
    handleRemoveFromWishlist: (item: any) => void;
	handleAddToCart?: (item: any) => void;
    isAlreadyInWishList?: boolean;
    mode?: string;
}

export interface ProductInterface {
	productName: string;
	productPrice: number;
	discountStatus?: boolean;
	productsAvailable?: number;
	productQuantity: number;
	noOfItemsSold?: number;
	discountPrice?: number;
	productDescription?: string;
	productSection: ProductSectionInterface[];
	availabilityStatus: boolean;
	productCategory: ProductCategoryInterface[];
	productSize?: ProductSizeInterface[];
	productColor?: ProductColorInterface[];
	slug?: string;
	productImages: imageInterface[];
	_id: string;
}
