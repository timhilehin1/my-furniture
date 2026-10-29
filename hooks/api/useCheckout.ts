"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersApi, paymentsApi } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { CheckoutPayload } from "@/interfaces/api.interface";

const PENDING_ORDER_KEY = "pendingOrder";

export interface PendingOrder {
	orderId: string;
	authorizationUrl?: string;
	expiresAt?: string;
}

// sessionStorage: survives the Paystack redirect round-trip in the same tab
export const pendingOrderStore = {
	get(): PendingOrder | null {
		try {
			const raw = sessionStorage.getItem(PENDING_ORDER_KEY);
			return raw ? (JSON.parse(raw) as PendingOrder) : null;
		} catch {
			return null;
		}
	},
	set(order: PendingOrder) {
		try {
			sessionStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(order));
		} catch {
			// storage unavailable; the callback page falls back to the ?reference param
		}
	},
	clear() {
		try {
			sessionStorage.removeItem(PENDING_ORDER_KEY);
		} catch {
			// ignore
		}
	},
};

// Create order, then initiate payment. Returns the Paystack URL to redirect to.
export function useCheckout() {
	return useMutation({
		mutationFn: async (payload: CheckoutPayload) => {
			const { createdOrder } = await ordersApi.checkout(payload);
			pendingOrderStore.set({
				orderId: createdOrder.id,
				expiresAt: createdOrder.expiresAt,
			});
			const { authorizationUrl } = await paymentsApi.initiate(createdOrder.id);
			pendingOrderStore.set({
				orderId: createdOrder.id,
				expiresAt: createdOrder.expiresAt,
				authorizationUrl,
			});
			return authorizationUrl;
		},
	});
}

// Resume an existing pending order (after a 409 or abandoned Paystack page)
export function useResumePayment() {
	return useMutation({
		mutationFn: async (order: PendingOrder) => {
			const cached = pendingOrderStore.get();
			if (cached?.orderId === order.orderId && cached.authorizationUrl) {
				return cached.authorizationUrl;
			}
			const { authorizationUrl } = await paymentsApi.initiate(order.orderId);
			pendingOrderStore.set({ ...order, authorizationUrl });
			return authorizationUrl;
		},
	});
}

const POLL_INTERVAL_MS = 2000;
const POLL_TIMEOUT_MS = 30_000;

// Polls order status until the backend says it's final (webhook may arrive after the redirect)
export function useOrderStatus(orderId: string | null, startedAt: number) {
	const queryClient = useQueryClient();
	return useQuery({
		queryKey: queryKeys.orderStatus(orderId ?? ""),
		queryFn: async () => {
			const status = await ordersApi.status(orderId as string);
			if (status.status === "PAID") {
				// webhook cleared the cart server-side
				queryClient.invalidateQueries({ queryKey: queryKeys.cart });
			}
			return status;
		},
		enabled: !!orderId,
		staleTime: 0,
		refetchOnWindowFocus: false,
		refetchInterval: (query) =>
			query.state.data?.isFinal || Date.now() - startedAt > POLL_TIMEOUT_MS
				? false
				: POLL_INTERVAL_MS,
	});
}
