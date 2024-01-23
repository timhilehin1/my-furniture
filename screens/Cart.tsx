"use client";
import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import CartCard from "@/components/CartCard";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

function CartPage() {
	const cart = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();
	const [total, setTotal] = useState(0);

	const calculateTotal = (price: number, quantity: number) => {
		return price * quantity;
	};

	return (
		<section className='mt-2 md:mt-16 p-8'>
			<div className='pb-16  flex flex-col gap-1 items-center'>
				<p className='md:text-3xl text-2xl font-black'>YOUR SHOPPING CART</p>
				<div className='flex gap-1 items-center text-xs font-semibold'>
					<div className='flex gap-2 items-center'>
						<IoHomeOutline size={12} />
						<Link href='/'>
							<p>Home</p>
						</Link>
					</div>
					<p className='font-black'>.</p>
					<div>Your Shopping Cart</div>
				</div>
			</div>
			{cart.length > 0 ? (
				<main className='table_section grid grid-cols-1 semiLarge:flex semiLarge:justify-between  mt-4 gap-9 lg:gap-8 mb-4'>
					<div className='table_section_left semiLarge:w-8/12 w-full'>
						<header className='border border-[#e4e6e6]  bg-[#f2f2f2] p-3 flex text-xs font-semibold'>
							<p className='basis-3/5'>PRODUCT</p>
							<p className='basis-1/6'>PRICE</p>
							<p className='basis-1/6'>QUANTITY</p>
							<p className='basis-1/6'>TOTAL</p>
						</header>
						{cart.map((item) => (
							<CartCard
								productImages={item.productImages}
								productName={item.productName}
								productPrice={item.productPrice}
                                calculateTotal={calculateTotal}
							/>
						))}
					</div>

					<div
						className='table_section_right
                        border border-[#e4e6e6] semiLarge:w-4/12 w-full bg-[#f2f2f2]'
					>
						2222
					</div>
				</main>
			) : (
				<main className='flex flex-col gap-4 mb-8'>
					<p className='font-bold text-secondary-text-color text-2xl'>
						Your cart is currently empty
					</p>
					<p className='text-secondary-text-color text-sm'>
						Before proceeding to checkout you must add some products to your
						shopping cart.
					</p>
					<p className='text-secondary-text-color text-sm'>
						You will find a lot of interesting products on our "Shop" page.
					</p>
					<Link href='/'>
						<button className='border-none  text-primary-color bg-secondary-color  border-2   rounded-md py-2 px-4 md:py-2.5 md:px-4 text-base w-4/6 semiLarge:w-1/6 mt-6'>
							Continue Shopping
						</button>
					</Link>
				</main>
			)}

			<hr className='border-[secondary-text-color]' />
		</section>
	);
}

export default CartPage;
