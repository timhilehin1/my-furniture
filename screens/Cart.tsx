"use client";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import CartCard from "@/components/CartCard";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
	increaseQuantity,
	decreaseQuantity,
	removeFromCart,
} from "@/lib/slices/cartSlice";
import { getNairaFormat } from "@/utils/utils";
import MobileCartCard from "@/components/MobileCartCard";
import { SiVisa } from "react-icons/si";
import SuggestedProducts from "@/components/SuggestedProducts";

function CartPage() {
	const cart = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();
	// console.log(cart);

	// calculate Price by multiplying price and quantity
	const calculateProductPrice = (price: number, quantity: number) => {
		return price * quantity;
	};

	// get sum total of all products in cart
	const getTotal = () => {
		let sum = 0;
		if (cart.length <= 0) return sum;
		cart.forEach((item) => {
			sum += item.productPrice * item.productQuantity;
		});
		return sum;
	};

	return (
		<section className="mt-2 md:mt-16 lg:p-8 px-4 ">
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
			{cart.length > 0 ? (
				<>
					<main className="table_section  flex flex-col  lg:flex lg:flex-row lg:justify-between  mt-4 gap-9 lg:gap-8 mb-4">
						<div className="table_section_left lg:w-8/12 w-full">
							<header className="border border-[#e4e6e6]  bg-[#f2f2f2] p-3 hidden lg:flex text-xs font-semibold">
								<p className="basis-3/5">PRODUCT</p>
								<p className="basis-1/6">PRICE</p>
								<p className="basis-1/6">QUANTITY</p>
								<p className="basis-1/6">TOTAL</p>
							</header>
							{cart.map((item) => (
								<CartCard
									key={item._id}
									productImages={item.productImages}
									productName={item.productName}
									productPrice={item.productPrice}
									calculateProductPrice={calculateProductPrice}
									productSize={item?.productSize || []}
									productColor={item?.productColor || []}
									productQuantity={item.productQuantity}
									decreaseQuantity={() => dispatch(decreaseQuantity(item))}
									increaseQuantity={() => dispatch(increaseQuantity(item))}
									handleRemoveFromCart={() => dispatch(removeFromCart(item))}
								/>
							))}
							{/* //mobile view for cart card, this was done this way due to the  layout difference of the cards n different screen sizes */}
							{cart.map((item) => (
								<MobileCartCard
									key={item._id}
									productImages={item.productImages}
									productName={item.productName}
									productPrice={item.productPrice}
									calculateProductPrice={calculateProductPrice}
									productSize={item?.productSize || []}
									productColor={item?.productColor || []}
									productQuantity={item.productQuantity}
									decreaseQuantity={() => dispatch(decreaseQuantity(item))}
									increaseQuantity={() => dispatch(increaseQuantity(item))}
									handleRemoveFromCart={() => dispatch(removeFromCart(item))}
								/>
							))}
							<div className="flex gap-4 button_group items-center mt-8">
								<button className="w-full text-sm font-semibold  border-2 border-secondary-color text-secondary-color  bg-primary-color p-2.5 rounded hover:bg-secondary-color hover:text-primary-color">
									Proceed to Checkout
								</button>
								<Link className="w-full" href={"/"}>
									<button className="w-full text-sm font-semibold text-white bg-secondary-color p-2.5 rounded">
										Continue Shopping
									</button>
								</Link>
							</div>

							<p className="font-bold mt-20">
								YOU MAY ALSO LIKE THESE PRODUCTS
							</p>
							<SuggestedProducts />
						</div>

						<div
							className="table_section_right
                         lg:w-4/12 w-full"
						>
							<header className="border border-[#e4e6e6] p-3 text-secondary-text-color text-xs font-semibold">
								THERE ARE {cart.length} ITEM(S) IN YOUR CART
							</header>
							<main className="border border-[#e4e6e6]  bg-[#f2f2f2] flex gap-6 flex-col p-3">
								<div className="flex justify-between items-center font-bold">
									<p className="text-sm">TOTAL:</p>
									<p>{getNairaFormat(getTotal().toString())}</p>
								</div>
								<div className="flex justify-between items-center">
									<p className="font-bold text-sm">SHIPPING:</p>
									<p className="text-secondary-text-color text-xs font-medium">
										Shipping & taxes calculated at checkout
									</p>
								</div>
								{getTotal() >= 100000 && (
									<div className="text-green-600 text-xs font-bold">
										CONGRATULATIONS! YOU'VE GOT FREE SHIPPING!
									</div>
								)}

								{/* <p>slider</p> */}
								<p className="text-secondary-text-color text-xs font-medium">
									Free shipping for any orders above{" "}
									<span className="text-green-600 text-xs font-bold">
										{getNairaFormat("100000")}
									</span>
								</p>

								<p className="font-bold text-xs">ADD A NOTE TO YOUR ORDER :</p>
								<textarea
									rows={10}
									className="border border-[#e4e6e6] p-2 text-xs h-50"
									placeholder="Add a note to your order"
								/>
								<button className="bg-yellow-400 p-2.5 cursor-pointer text-sm font-semibold rounded text-blue-700 flex justify-center items-center">
									Buy With <SiVisa size={30} />
								</button>
							</main>
						</div>
					</main>
				</>
			) : (
				<main className="flex flex-col gap-4 mb-8">
					<p className="font-bold text-secondary-text-color text-2xl">
						Your cart is currently empty
					</p>
					<p className="text-secondary-text-color text-sm">
						Before proceeding to checkout you must add some products to your
						shopping cart.
					</p>
					<p className="text-secondary-text-color text-sm">
						You will find a lot of interesting products on our "Shop" page.
					</p>
					<Link href={"/"}>
						<button className="border-none  text-primary-color bg-secondary-color  border-2   rounded-md py-2 px-4 md:py-2.5 md:px-4 text-base w-4/6 semiLarge:w-1/6 mt-6">
							Continue Shopping
						</button>
					</Link>
				</main>
			)}

			<hr className="border-[secondary-text-color]" />
		</section>
	);
}

export default CartPage;
