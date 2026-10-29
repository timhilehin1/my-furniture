import { store } from "./store";
import { logout, setTokens } from "./slices/authSlice";
import {
	AuthResponse,
	AuthTokens,
	Cart,
	CartRow,
	CheckoutPayload,
	CheckoutResponse,
	InitiatePaymentResponse,
	LoginPayload,
	OrderListParams,
	OrderListResponse,
	OrderStatusResponse,
	RegisterPayload,
	User,
} from "@/interfaces/api.interface";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export class ApiError extends Error {
	status: number;
	// true when the request carried a token; only then does a 401 mean "session expired"
	authed: boolean;
	fieldErrors: Record<string, string>;
	data: Record<string, unknown>;

	constructor(
		status: number,
		message: string,
		opts: {
			authed?: boolean;
			fieldErrors?: Record<string, string>;
			data?: Record<string, unknown>;
		} = {}
	) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.authed = opts.authed ?? false;
		this.fieldErrors = opts.fieldErrors ?? {};
		this.data = opts.data ?? {};
	}
}

export const isApiError = (err: unknown): err is ApiError =>
	err instanceof ApiError;

// Map a backend validation message ("email must be an email") onto a form field
export function toFieldErrors(
	err: unknown,
	fields: string[]
): { fieldErrors: Record<string, string>; formError: string | null } {
	if (!isApiError(err)) {
		return { fieldErrors: {}, formError: "Something went wrong. Please try again." };
	}
	const fieldErrors: Record<string, string> = {};
	for (const [key, value] of Object.entries(err.fieldErrors)) {
		if (fields.includes(key)) fieldErrors[key] = value;
	}
	if (Object.keys(fieldErrors).length === 0 && err.status === 400) {
		const field = fields.find((f) => err.message.startsWith(`${f} `));
		if (field) fieldErrors[field] = err.message;
	}
	return {
		fieldErrors,
		formError: Object.keys(fieldErrors).length ? null : err.message,
	};
}

interface RequestOptions {
	method?: "GET" | "POST" | "PUT" | "DELETE";
	body?: unknown;
	auth?: boolean;
}

async function rawRequest(
	path: string,
	{ method = "GET", body }: RequestOptions,
	token: string | null
): Promise<Response> {
	const headers: Record<string, string> = {};
	if (body !== undefined) headers["Content-Type"] = "application/json";
	if (token) headers.Authorization = `Bearer ${token}`;
	try {
		return await fetch(`${BASE_URL}${path}`, {
			method,
			headers,
			body: body !== undefined ? JSON.stringify(body) : undefined,
		});
	} catch {
		throw new ApiError(0, "Can't reach the server. Check your connection.");
	}
}

async function toApiError(res: Response, authed: boolean): Promise<ApiError> {
	let body: Record<string, unknown> = {};
	try {
		body = await res.json();
	} catch {
		// non-JSON error body
	}
	const raw = body.message;
	const message = Array.isArray(raw)
		? String(raw[0] ?? "Request failed")
		: typeof raw === "string"
			? raw
			: res.statusText || "Request failed";
	const fieldErrors =
		body.errors && typeof body.errors === "object"
			? (body.errors as Record<string, string>)
			: {};
	const { message: _m, errors: _e, statusCode: _s, error: _er, ...data } = body;
	return new ApiError(res.status, message, { authed, fieldErrors, data });
}

// One refresh at a time: the backend rotates refresh tokens, so parallel refreshes would invalidate each other
let refreshPromise: Promise<string | null> | null = null;

function refreshAccessToken(): Promise<string | null> {
	if (!refreshPromise) {
		refreshPromise = (async () => {
			const refreshToken = store.getState().auth.refreshToken;
			if (!refreshToken) return null;
			const res = await rawRequest(
				"/auth/refresh",
				{ method: "POST", body: { refreshToken } },
				null
			);
			if (!res.ok) {
				store.dispatch(logout());
				return null;
			}
			const tokens: AuthTokens = await res.json();
			store.dispatch(setTokens(tokens));
			return tokens.accessToken;
		})().finally(() => {
			refreshPromise = null;
		});
	}
	return refreshPromise;
}

export async function apiFetch<T>(
	path: string,
	options: RequestOptions = {}
): Promise<T> {
	const auth = options.auth ?? true;
	const token = auth ? store.getState().auth.accessToken : null;
	let res = await rawRequest(path, options, token);

	if (res.status === 401 && auth && token) {
		const newToken = await refreshAccessToken();
		if (!newToken) {
			throw new ApiError(401, "Your session has expired. Please log in again.", {
				authed: true,
			});
		}
		res = await rawRequest(path, options, newToken);
	}

	if (!res.ok) throw await toApiError(res, auth && !!token);
	if (res.status === 204) return undefined as T;
	return res.json() as Promise<T>;
}

export const authApi = {
	register: (body: RegisterPayload) =>
		apiFetch<AuthResponse>("/auth/register", { method: "POST", body, auth: false }),
	login: (body: LoginPayload) =>
		apiFetch<AuthResponse>("/auth/login", { method: "POST", body, auth: false }),
	profile: () => apiFetch<User>("/profile"),
};

export const cartApi = {
	get: () => apiFetch<Cart>("/cart"),
	add: (productId: string, quantity = 1) =>
		apiFetch<CartRow>("/cart", { method: "POST", body: { productId, quantity } }),
	update: (productId: string, quantity: number) =>
		apiFetch<CartRow>(`/cart/${encodeURIComponent(productId)}`, {
			method: "PUT",
			body: { quantity },
		}),
	remove: (productId: string) =>
		apiFetch<CartRow>(`/cart/${encodeURIComponent(productId)}`, {
			method: "DELETE",
		}),
	clear: () =>
		apiFetch<{ message: string; count: number }>("/cart", { method: "DELETE" }),
};

export const ordersApi = {
	checkout: (body: CheckoutPayload) =>
		apiFetch<CheckoutResponse>("/orders/checkout", { method: "POST", body }),
	list: ({ page = 1, limit = 10, status }: OrderListParams = {}) => {
		const params = new URLSearchParams({ page: String(page), limit: String(limit) });
		if (status) params.set("status", status);
		return apiFetch<OrderListResponse>(`/orders?${params}`);
	},
	status: (orderId: string) =>
		apiFetch<OrderStatusResponse>(
			`/orders/${encodeURIComponent(orderId)}/status`
		),
};

export const paymentsApi = {
	initiate: (orderId: string) =>
		apiFetch<InitiatePaymentResponse>("/payments/initiate", {
			method: "POST",
			body: { orderId },
		}),
};
