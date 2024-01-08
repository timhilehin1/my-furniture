export interface imageInterface {
	imageUrl: string;
	caption: string;
	attribution: string;
}

export interface ProductSectionInterface {
	sectionName: string;
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
}

export interface ProductInterface {
	productName: string;
	productPrice: number;
	discountStatus?: boolean;
	discountPrice?: number;
	productDescription?: string;
	productSection: ProductSectionInterface[];
	availabilityStatus: boolean;
	productCategory: [];
	productSize?: [];
	slug?: string;
	productImages: imageInterface[];
	_id: string;
}
