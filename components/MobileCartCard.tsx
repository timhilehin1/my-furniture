// quite stressful cuz why not make a design that's easy to implemnt on both mobile and desktop
import React from "react";
import { getNairaFormat } from "@/utils/utils";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuMinus, LuPlus } from "react-icons/lu";
import { CartCardInterface } from "./CartCard";

function MobileCartCard({
	productImages,
	productName,
	productPrice,
	productSize,
	productColor,
	productQuantity,
	calculateProductPrice,
	increaseQuantity,
	decreaseQuantity,
    handleRemoveFromCart
}: CartCardInterface) {
	return (
		<main className='flex flex-col gap-4 mb-8 lg:hidden'>
			<section className='mobileCartCard flex flex-col gap-6  p-3 border border-[#e4e6e6]'>
				<RiDeleteBin5Line onClick={handleRemoveFromCart} className='cursor-pointer self-center' size={20} />
				<div className='flex gap-5 items-center image_container'>
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

					<div className='flex flex-col self-center gap-2.5'>
						<p className=' font-semibold text-secondary-text-color text-sm'>
							{productName}
						</p>

						<p className=' font-semibold text-secondary-text-color text-sm'>
							Size: {productSize.length > 0 ? productSize[0].sizeName : ""}
						</p>

						<p className=' font-semibold text-secondary-text-color text-sm'>
							Color: {productColor.length > 0 ? productColor[0].colorName : ""}
						</p>
					</div>
				</div>
				<p className='font-semibold text-sm price'>
					Price: {getNairaFormat(productPrice.toString())}
				</p>
				<div className='counter_card border border-[#e4e6e6] flex items-center w-24 h-8 gap-4'>
					<LuMinus
						onClick={decreaseQuantity}
						className=' cursor-pointer grow-0'
						size={18}
					/>
					<p className='font-semibold bg-[#f2f2f2] text-center  w-10 grow'>
						{productQuantity}
					</p>
					<LuPlus
						onClick={increaseQuantity}
						className='cursor-pointer grow-0'
						size={18}
					/>
				</div>
				<p className='font-semibold text-sm'>
					Total:{" "}
					{getNairaFormat(
						calculateProductPrice(productPrice, productQuantity).toString()
					)}
				</p>
			</section>
		</main>
	);
}

export default MobileCartCard;
