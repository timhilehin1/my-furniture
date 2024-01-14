"use client";
import React from "react";
import {
	IoHomeOutline,
	IoCartOutline,
	IoPersonOutline,
	IoGridOutline,
} from "react-icons/io5";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import ProductCard from "@/components/ProductCard";
import { ProductInterface } from "@/interfaces/product.interface";
import { removeFromWishlist } from "@/lib/slices/wishlistSlice";


function WishlistPage() {
	const wishlist = useAppSelector((state) => state.wishlist);
	const dispatch = useAppDispatch();
	const handleRemoveFromWishlist = (item: ProductInterface, event: React.SyntheticEvent) => {
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
							<p>Home</p>
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
			</section>
			<hr className='border-[secondary-text-color] mx-4' />
		</>
	);
}

export default WishlistPage;
