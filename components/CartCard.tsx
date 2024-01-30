import React, { useState, useEffect } from "react";
import { getNairaFormat } from "@/utils/utils";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuMinus, LuPlus } from "react-icons/lu";
import {
	imageInterface,
	ProductSizeInterface,
	ProductColorInterface,
} from "@/interfaces/product.interface";

export interface CartCardInterface {
	productImages: imageInterface[];
	productSize: ProductSizeInterface[];
	productColor: ProductColorInterface[];
	productName: string;
	productPrice: number;
	calculateProductPrice: (price: number, quantity: number) => number;
	productQuantity: number;
	increaseQuantity: () => void;
	decreaseQuantity: () => void;
	handleRemoveFromCart: () => void;
}

function CartCard({
	productImages,
	productName,
	productPrice,
	productSize,
	productColor,
	productQuantity,
	calculateProductPrice,
	increaseQuantity,
	decreaseQuantity,
	handleRemoveFromCart,
}: CartCardInterface) {
	return (
		<section className='p-3 border border-[#e4e6e6] lg:flex hidden items-center'>
			{/* //product details */}
			<div className='flex gap-4 items-center basis-3/5'>
				<RiDeleteBin5Line
					onClick={handleRemoveFromCart}
					className='cursor-pointer'
					size={16}
				/>
				<Image
					priority={true}
					src={productImages.length > 0 ? productImages[0].imageUrl : ""}
					alt={
						productImages.length > 0
							? productImages[0].attribution
							: "a product image"
					}
					width={0}
					height={0}
					sizes='100%'
					style={{
						width: "6rem",
						height: "6.25rem",
						objectFit: "cover",
						mixBlendMode: "normal",
					}}
				/>
				<div className='flex flex-col gap-2'>
					<p className='text-xs font-semibold'>{productName}</p>
					<p className='text-xs font-semibold text-secondary-text-color'>
						Size: {productSize.length > 0 ? productSize[0].sizeName : ""}
					</p>
					<p className='text-xs font-semibold text-secondary-text-color'>
						Color: {productColor.length > 0 ? productColor[0].colorName : ""}
					</p>
				</div>
			</div>

			{/* price */}
			<p className='text-secondary-text-color font-semibold text-xs basis-1/6'>
				{getNairaFormat(productPrice.toString())}
			</p>

			{/* quantity */}
			<div className='basis-1/6'>
				<div className='border border-[#e4e6e6] flex items-center w-9/12'>
					<LuMinus
						onClick={decreaseQuantity}
						className='basis-1/6 cursor-pointer'
						size={14}
					/>
					<p className='text-sm font-semibold bg-[#f2f2f2] p-1 basis-8/12 text-center'>
						{productQuantity}
					</p>
					<LuPlus
						onClick={increaseQuantity}
						className='basis-1/6 cursor-pointer '
						size={16}
					/>
				</div>
			</div>

			{/* total */}
			<p className=' font-semibold text-sm basis-1/6'>
				{getNairaFormat(
					calculateProductPrice(productPrice, productQuantity).toString()
				)}
			</p>
		</section>
	);
}

export default CartCard;
