"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { Cart } from "@/interfaces/api.interface";
import { useIsLoggedIn } from "./useAuth";

export function useCart() {
	const isLoggedIn = useIsLoggedIn();
	return useQuery({
		queryKey: queryKeys.cart,
		queryFn: cartApi.get,
		enabled: isLoggedIn,
	});
}

// Badge count shared by Navbar/BottomNav; reads the same cache, no extra request
export function useCartCount() {
	const { data } = useCart();
	return data ? data.items.length + data.unavailableItems.length : 0;
}

function useInvalidateCart() {
	const queryClient = useQueryClient();
	return () => queryClient.invalidateQueries({ queryKey: queryKeys.cart });
}

export function useAddToCart() {
	const invalidate = useInvalidateCart();
	return useMutation({
		mutationFn: ({ productId, quantity = 1 }: { productId: string; quantity?: number }) =>
			cartApi.add(productId, quantity),
		onSettled: invalidate,
	});
}

export function useUpdateCartQty() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
			cartApi.update(productId, quantity),
		// optimistic: update the line and subtotal immediately, roll back on error
		onMutate: async ({ productId, quantity }) => {
			await queryClient.cancelQueries({ queryKey: queryKeys.cart });
			const previous = queryClient.getQueryData<Cart>(queryKeys.cart);
			if (previous) {
				const items = previous.items.map((item) =>
					item.productId === productId
						? { ...item, quantity, lineTotal: item.unitPrice * quantity }
						: item
				);
				queryClient.setQueryData<Cart>(queryKeys.cart, {
					...previous,
					items,
					subTotal: items.reduce((sum, item) => sum + item.lineTotal, 0),
				});
			}
			return { previous };
		},
		onError: (_err, _vars, context) => {
			if (context?.previous) {
				queryClient.setQueryData(queryKeys.cart, context.previous);
			}
		},
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.cart }),
	});
}

export function useRemoveCartItem() {
	const invalidate = useInvalidateCart();
	return useMutation({
		mutationFn: (productId: string) => cartApi.remove(productId),
		onSettled: invalidate,
	});
}

export function useClearCart() {
	const invalidate = useInvalidateCart();
	return useMutation({
		mutationFn: cartApi.clear,
		onSettled: invalidate,
	});
}
