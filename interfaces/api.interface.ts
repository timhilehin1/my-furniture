import {
	ProductCategoryInterface,
	ProductColorInterface,
	ProductSectionInterface,
	ProductSizeInterface,
} from "./product.interface";

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	city?: string | null;
	state?: string | null;
	country?: string | null;
	role?: string;
	createdAt: string;
	updatedAt: string;
}

export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
}

export type AuthResponse = User & AuthTokens;

export interface RegisterPayload {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface CartRow {
	id: string;
	userId: string;
	productId: string;
	productName: string;
	imageUrl: string | null;
	quantity: number;
	createdAt: string;
	updatedAt: string;
}

// product projection returned by the backend (note: images use `url`, not `imageUrl`)
export interface CartProduct {
	_id: string;
	productName: string;
	productDescription?: string;
	productPrice: number;
	discountPrice?: number;
	discountStatus?: boolean;
	availabilityStatus: boolean;
	slug?: string;
	productImages?: { caption?: string; attribution?: string; url: string }[];
	productCategory?: ProductCategoryInterface[];
	productSection?: ProductSectionInterface[];
	productSize?: ProductSizeInterface[];
	productColor?: ProductColorInterface[];
}

export interface CartItem extends CartRow {
	product: CartProduct;
	unitPrice: number;
	lineTotal: number;
}

export interface UnavailableCartItem extends CartRow {
	reason: "DELETED" | "OUT_OF_STOCK";
}

export interface Cart {
	items: CartItem[];
	subTotal: number;
	unavailableItems: UnavailableCartItem[];
}

export interface CheckoutPayload {
	shippingAddress: string;
	shippingCity: string;
	shippingState: string;
	shippingCountry: string;
	shippingZipcode?: string;
	phone: string;
	email: string;
}

export interface Order {
	id: string;
	userId: string;
	status: OrderStatus;
	total: number;
	expiresAt: string;
	createdAt: string;
}

export interface CheckoutResponse {
	createdOrder: Order;
	orderItems: unknown[];
	message: string;
}

export type OrderStatus =
	| "PENDING"
	| "PAID"
	| "PROCESSING"
	| "SHIPPED"
	| "DELIVERED"
	| "CANCELLED"
	| "EXPIRED"
	| "FAILED"
	| "REFUNDED";

export interface OrderStatusResponse {
	status: OrderStatus;
	message: string;
	isFinal: boolean;
}

export type PaymentStatus = "SUCCESS" | "FAILED" | "REFUND_REQUIRED" | "REFUNDED";

// GET /orders item (backend selects only these fields; no unit price or order item ids)
export interface OrderListItem {
	id: string;
	status: OrderStatus;
	total: number;
	createdAt: string;
	shippingAddress: string;
	shippingCity: string;
	shippingState: string;
	shippingCountry: string;
	orderItems: {
		productName: string;
		imageUrl: string | null;
		quantity: number;
		lineTotal: number;
	}[];
	paymentStatus: PaymentStatus | null;
}

export interface OrderListResponse {
	data: OrderListItem[];
	meta: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

export interface OrderListParams {
	page?: number;
	limit?: number;
	status?: OrderStatus;
}

export interface InitiatePaymentResponse {
	authorizationUrl: string;
	accessCode: string;
	reference: string;
}
