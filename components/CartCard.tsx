import React, { useState, useEffect } from "react";
import { getNairaFormat } from "@/utils/utils";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { cartInterface } from "@/interfaces/cart.interface";
import { LuMinus, LuPlus } from "react-icons/lu";
import { imageInterface } from "@/interfaces/product.interface";

interface CartCardInterface {
	productImages: imageInterface[];
	productName: string;
	productPrice: number;
	calculateTotal: (price: number, quantity: number) => number;
}

function CartCard({
	productImages,
	productName,
	productPrice,
	calculateTotal,
}: CartCardInterface) {
	const [quantity, setQuantity] = useState<number>(1);
	const [total, setTotal] = useState(0);
	const incrementQuantity = () => {
		setQuantity((prevCount) => prevCount + 1);
	};
	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity((prevCount) => prevCount - 1);
		}
	};

	return (
		<section className='p-3 border border-[#e4e6e6] flex items-center'>
			{/* //product details */}
			<div className='flex gap-4 items-center basis-3/5'>
				<RiDeleteBin5Line className='cursor-pointer' size={16} />
				<Image
					priority={true}
					src={productImages.length > 0 ? productImages[0].imageUrl : ""}
					alt={
						productImages.length > 0
							? productImages[0].attribution
							: "alternative text"
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
						Size: 5
					</p>
					<p className='text-xs font-semibold text-secondary-text-color'>
						Color: Gold
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
						onClick={decrementQuantity}
						className='basis-1/6 cursor-pointer'
						size={14}
					/>
					<p className='text-sm font-semibold bg-[#f2f2f2] p-1 basis-8/12 text-center'>
						{quantity}
					</p>
					<LuPlus
						onClick={incrementQuantity}
						className='basis-1/6 cursor-pointer '
						size={16}
					/>
				</div>
			</div>

			{/* total */}
			<p className=' font-semibold text-sm basis-1/6'>
				{getNairaFormat(calculateTotal(productPrice, quantity).toString())}
			</p>
		</section>
	);
}

export default CartCard;
