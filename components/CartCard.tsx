import React from "react";
import { getNairaFormat } from "@/utils/utils";

import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuMinus, LuPlus } from "react-icons/lu";

// backend can send null prices (e.g. discount on with no discount price set in Sanity)
const formatPrice = (value: number | null | undefined) =>
	typeof value === "number" ? getNairaFormat(value.toString()) : "—";

export interface CartCardInterface {
	imageUrl: string | null;
	productName: string;
	productSize?: string;
	productColor?: string;
	unitPrice: number | null;
	lineTotal: number | null;
	productQuantity: number;
	busy?: boolean;
	increaseQuantity: () => void;
	decreaseQuantity: () => void;
	handleRemoveFromCart: () => void;
}

function CartCard({
	imageUrl,
	productName,
	unitPrice,
	lineTotal,
	productSize,
	productColor,
	productQuantity,
	busy,
	increaseQuantity,
	decreaseQuantity,
	handleRemoveFromCart,
}: CartCardInterface) {
	return (
		<section
			className={`p-3 border border-[#e4e6e6] lg:flex hidden items-center ${
				busy ? "opacity-60 pointer-events-none" : ""
			}`}
		>
			{/* //product details */}
			<div className='flex gap-4 items-center basis-3/5'>
				<button aria-label={`Remove ${productName}`} onClick={handleRemoveFromCart}>
					<RiDeleteBin5Line className='cursor-pointer' size={16} />
				</button>
				{imageUrl && (
					<Image
						src={imageUrl}
						alt={productName}
						width={96}
						height={100}
						style={{
							width: "6rem",
							height: "6.25rem",
							objectFit: "cover",
							mixBlendMode: "normal",
						}}
					/>
				)}
				<div className='flex flex-col gap-2'>
					<p className='text-xs font-semibold'>{productName}</p>
					{productSize && (
						<p className='text-xs font-semibold text-secondary-text-color'>
							Size: {productSize}
						</p>
					)}
					{productColor && (
						<p className='text-xs font-semibold text-secondary-text-color'>
							Color: {productColor}
						</p>
					)}
				</div>
			</div>

			{/* price */}
			<p className='text-secondary-text-color font-semibold text-xs basis-1/6'>
				{formatPrice(unitPrice)}
			</p>

			{/* quantity */}
			<div className='basis-1/6'>
				<div className='border border-[#e4e6e6] flex items-center w-9/12'>
					<button aria-label='Decrease quantity' className='basis-1/6 disabled:opacity-30'
						disabled={productQuantity <= 1} onClick={decreaseQuantity}>
						<LuMinus className='cursor-pointer' size={14} />
					</button>
					<p className='text-sm font-semibold bg-[#f2f2f2] p-1 basis-8/12 text-center'>
						{productQuantity}
					</p>
					<button aria-label='Increase quantity' className='basis-1/6' onClick={increaseQuantity}>
						<LuPlus className='cursor-pointer' size={16} />
					</button>
				</div>
			</div>

			{/* total */}
			<p className=' font-semibold text-sm basis-1/6'>
				{formatPrice(lineTotal)}
			</p>
		</section>
	);
}

export default CartCard;
