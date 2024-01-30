"use client";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import ProductCard from "@/components/ProductCard";
import { ProductInterface } from "@/interfaces/product.interface";
import { removeFromWishlist } from "@/lib/slices/wishlistSlice";
import Link from "next/link";

function WishlistPage() {
	const wishlist = useAppSelector((state) => state.wishlist);
	const dispatch = useAppDispatch();
	const handleRemoveFromWishlist = (
		item: ProductInterface,
		event: React.SyntheticEvent
	) => {
		event.preventDefault();
		dispatch(removeFromWishlist(item));
	};

	const isAlreadyInWishList = (itemId: string) => {
		return wishlist.some((item) => item._id === itemId);
	};

	return (
		<>
			<section className='mt-2 md:mt-8 p-8'>
				<div className='pb-16  flex flex-col gap-1 items-center'>
					<p className='text-2xl font-black '>PAGE WISHLIST</p>
					<div className='flex gap-1 items-center text-xs font-semibold'>
						<div className='flex gap-2 items-center'>
							<IoHomeOutline size={12} />
							<Link href='/'>
								<p>Home</p>
							</Link>
						</div>
						<p className='font-black'>.</p>
						<div>Wishlist</div>
					</div>
				</div>

				<main className='grid grid-cols-2 semiLarge:grid-cols-3 lg:grid-cols-5 gap-4 px-2'>
					{wishlist.length > 0
						? wishlist.map((product) => (
								<ProductCard
									key={product._id}
									{...product}
									handleAddToWishlist={() => {}}
									mode='wishlist'
									handleRemoveFromWishlist={(e) =>
										handleRemoveFromWishlist(product, e)
									}
									isAlreadyInWishList={isAlreadyInWishList(product._id)}
								/>
						  ))
						: null}
				</main>

				{wishlist.length === 0 ? (
					<main className='flex flex-col gap-4 mb-8'>
						<p className='text-secondary-text-color text-sm'>
							You have not added any items to wishlist.
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
				) : null}
			</section>
			<hr className='border-[secondary-text-color] mx-4' />
		</>
	);
}

export default WishlistPage;
