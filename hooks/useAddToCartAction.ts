"use client";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAddToCart } from "./api/useCart";
import { useIsLoggedIn } from "./api/useAuth";
import { isApiError } from "@/lib/api";

// Add-to-cart for product UIs: requires login, then posts to the server cart
export function useAddToCartAction() {
	const router = useRouter();
	const pathname = usePathname();
	const isLoggedIn = useIsLoggedIn();
	const addToCart = useAddToCart();

	const add = (product: { _id: string; productName: string }, quantity = 1) => {
		if (!isLoggedIn) {
			toast.info("Log in to add items to your cart");
			router.push(`/login?next=${encodeURIComponent(pathname)}`);
			return;
		}
		addToCart.mutate(
			{ productId: product._id, quantity },
			{
				onSuccess: () => toast.success(`${product.productName} has been added to cart`),
				onError: (err) => {
					if (isApiError(err) && err.status === 401) return; // handled globally
					toast.error(
						isApiError(err) && err.status === 404
							? `${product.productName} is no longer available`
							: err.message
					);
				},
			}
		);
	};

	const isAdding = (productId: string) =>
		addToCart.isPending && addToCart.variables?.productId === productId;

	return { add, isAdding };
}
