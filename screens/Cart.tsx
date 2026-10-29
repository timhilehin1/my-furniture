"use client";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import CartCard from "@/components/CartCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getNairaFormat } from "@/utils/utils";
import MobileCartCard from "@/components/MobileCartCard";
import SuggestedProducts from "@/components/SuggestedProducts";
import {
	useCart,
	useRemoveCartItem,
	useUpdateCartQty,
} from "@/hooks/api/useCart";
import { useIsLoggedIn } from "@/hooks/api/useAuth";
import { isApiError } from "@/lib/api";
import { CartItem } from "@/interfaces/api.interface";

const notifyError = (err: unknown) => {
	if (isApiError(err) && err.status === 401) return; // handled globally
	toast.error(err instanceof Error ? err.message : "Something went wrong");
};

function CartPage() {
	const router = useRouter();
	const isLoggedIn = useIsLoggedIn();
	const cart = useCart();
	const updateQty = useUpdateCartQty();
	const removeItem = useRemoveCartItem();

	const isRemoving = (productId: string) =>
		removeItem.isPending && removeItem.variables === productId;

	const changeQty = (item: CartItem, delta: number) => {
		const quantity = item.quantity + delta;
		if (quantity < 1) return;
		updateQty.mutate({ productId: item.productId, quantity }, { onError: notifyError });
	};

	const remove = (productId: string) => {
		if (isRemoving(productId)) return;
		removeItem.mutate(productId, { onError: notifyError });
	};

	const cardProps = (item: CartItem) => ({
		imageUrl: item.imageUrl ?? item.product.productImages?.[0]?.url ?? null,
		productName: item.productName,
		productSize: item.product.productSize?.[0]?.sizeName,
		productColor: item.product.productColor?.[0]?.colorName,
		unitPrice: item.unitPrice,
		lineTotal: item.lineTotal,
		productQuantity: item.quantity,
		busy: isRemoving(item.productId),
		decreaseQuantity: () => changeQty(item, -1),
		increaseQuantity: () => changeQty(item, 1),
		handleRemoveFromCart: () => remove(item.productId),
	});

	const header = (
		<div className="pb-16  flex flex-col gap-1 items-center">
			<p className="md:text-3xl text-2xl font-black">YOUR SHOPPING CART</p>
			<div className="flex gap-1 items-center text-xs font-semibold">
				<div className="flex gap-2 items-center">
					<IoHomeOutline size={12} />
					<Link href="/">
						<p>Home</p>
					</Link>
				</div>
				<p className="font-black">.</p>
				<div>Your Shopping Cart</div>
			</div>
		</div>
	);

	const emptyState = (title: string, body: React.ReactNode, cta: React.ReactNode) => (
		<main className="flex flex-col gap-4 mb-8">
			<p className="font-bold text-secondary-text-color text-2xl">{title}</p>
			<div className="text-secondary-text-color text-sm">{body}</div>
			{cta}
		</main>
	);

	const primaryButtonClass =
		"border-none  text-primary-color bg-secondary-color  border-2   rounded-md py-2 px-4 md:py-2.5 md:px-4 text-base w-4/6 semiLarge:w-1/6 mt-6";

	let content: React.ReactNode;
	if (!isLoggedIn) {
		content = emptyState(
			"Log in to see your cart",
			"Your cart is saved to your account so it follows you across devices.",
			<Link href="/login?next=/cart">
				<button className={primaryButtonClass}>Login</button>
			</Link>
		);
	} else if (cart.isPending) {
		content = (
			<div className="lg:w-8/12 flex flex-col gap-3 mb-8">
				<Skeleton height={40} />
				<Skeleton height={110} count={3} />
			</div>
		);
	} else if (cart.isError) {
		content = emptyState(
			"We couldn't load your cart",
			cart.error.message,
			<button onClick={() => cart.refetch()} className={primaryButtonClass}>
				Retry
			</button>
		);
	} else if (cart.data.items.length === 0 && cart.data.unavailableItems.length === 0) {
		content = emptyState(
			"Your cart is currently empty",
			<>
				<p>Before proceeding to checkout you must add some products to your shopping cart.</p>
				<p>You will find a lot of interesting products on our &quot;Shop&quot; page.</p>
			</>,
			<Link href={"/"}>
				<button className={primaryButtonClass}>Continue Shopping</button>
			</Link>
		);
	} else {
		const { items, unavailableItems, subTotal } = cart.data;
		const blocked = unavailableItems.length > 0 || items.length === 0;
		content = (
			<main className="table_section  flex flex-col  lg:flex lg:flex-row lg:justify-between  mt-4 gap-9 lg:gap-8 mb-4">
				<div className="table_section_left lg:w-8/12 w-full">
					{items.length > 0 && (
						<header className="border border-[#e4e6e6]  bg-[#f2f2f2] p-3 hidden lg:flex text-xs font-semibold">
							<p className="basis-3/5">PRODUCT</p>
							<p className="basis-1/6">PRICE</p>
							<p className="basis-1/6">QUANTITY</p>
							<p className="basis-1/6">TOTAL</p>
						</header>
					)}
					{items.map((item) => (
						<CartCard key={item.id} {...cardProps(item)} />
					))}
					{/* //mobile view for cart card, this was done this way due to the  layout difference of the cards n different screen sizes */}
					{items.map((item) => (
						<MobileCartCard key={item.id} {...cardProps(item)} />
					))}

					{unavailableItems.length > 0 && (
						<div className="mt-6 flex flex-col gap-2">
							<p className="text-xs font-semibold text-red-600">
								THESE ITEMS CAN&apos;T BE ORDERED
							</p>
							{unavailableItems.map((item) => (
								<div key={item.id}
									className={`p-3 border border-[#e4e6e6] flex items-center justify-between gap-4 opacity-70 ${
										isRemoving(item.productId) ? "pointer-events-none" : ""
									}`}>
									<div className="flex flex-col gap-1">
										<p className="text-sm font-semibold">{item.productName}</p>
										<span className="text-xs font-semibold text-red-600">
											{item.reason === "DELETED" ? "No longer available" : "Out of stock"}
										</span>
									</div>
									<button onClick={() => remove(item.productId)}
										className="text-xs font-semibold underline">
										{isRemoving(item.productId) ? "Removing…" : "Remove"}
									</button>
								</div>
							))}
						</div>
					)}

					<div className="flex gap-4 button_group items-center mt-8">
						<button
							disabled={blocked}
							onClick={() => router.push("/checkout")}
							className="w-full text-sm font-semibold  border-2 border-secondary-color text-secondary-color  bg-primary-color p-2.5 rounded hover:bg-secondary-color hover:text-primary-color disabled:opacity-50 disabled:pointer-events-none"
						>
							Proceed to Checkout
						</button>
						<Link className="w-full" href={"/"}>
							<button className="w-full text-sm font-semibold text-white bg-secondary-color p-2.5 rounded">
								Continue Shopping
							</button>
						</Link>
					</div>
					{unavailableItems.length > 0 && (
						<p className="text-xs text-red-600 mt-2">
							Remove unavailable items to continue.
						</p>
					)}

					<p className="font-bold mt-20">YOU MAY ALSO LIKE THESE PRODUCTS</p>
					<SuggestedProducts />
				</div>

				<div className="table_section_right lg:w-4/12 w-full">
					<header className="border border-[#e4e6e6] p-3 text-secondary-text-color text-xs font-semibold">
						THERE ARE {items.length} ITEM(S) IN YOUR CART
					</header>
					<main className="border border-[#e4e6e6]  bg-[#f2f2f2] flex gap-6 flex-col p-3">
						<div className="flex justify-between items-center font-bold">
							<p className="text-sm">TOTAL:</p>
							<p>{getNairaFormat(subTotal.toString())}</p>
						</div>
						<div className="flex justify-between items-center">
							<p className="font-bold text-sm">SHIPPING:</p>
							<p className="text-secondary-text-color text-xs font-medium">
								Shipping & taxes calculated at checkout
							</p>
						</div>
						{subTotal >= 100000 && (
							<div className="text-green-600 text-xs font-bold">
								CONGRATULATIONS! YOU&apos;VE GOT FREE SHIPPING!
							</div>
						)}
						<p className="text-secondary-text-color text-xs font-medium">
							Free shipping for any orders above{" "}
							<span className="text-green-600 text-xs font-bold">
								{getNairaFormat("100000")}
							</span>
						</p>
					</main>
				</div>
			</main>
		);
	}

	return (
		<section className="mt-2 md:mt-16 lg:p-8 px-4 ">
			{header}
			{content}
			<hr className="border-[secondary-text-color]" />
		</section>
	);
}

export default CartPage;
