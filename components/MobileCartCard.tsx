// quite stressful cuz why not make a design that's easy to implemnt on both mobile and desktop
import React from "react";
import { getNairaFormat } from "@/utils/utils";

import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuMinus, LuPlus } from "react-icons/lu";
import { CartCardInterface } from "./CartCard";

// backend can send null prices (e.g. discount on with no discount price set in Sanity)
const formatPrice = (value: number | null | undefined) =>
	typeof value === "number" ? getNairaFormat(value.toString()) : "—";

function MobileCartCard({
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
		<main className={`flex flex-col gap-4 mb-8 lg:hidden ${busy ? "opacity-60 pointer-events-none" : ""}`}>
			<section className='mobileCartCard flex flex-col gap-6  p-3 border border-[#e4e6e6]'>
				<button aria-label={`Remove ${productName}`} className='self-center' onClick={handleRemoveFromCart}>
					<RiDeleteBin5Line className='cursor-pointer' size={20} />
				</button>
				<div className='flex gap-5 items-center image_container'>
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

					<div className='flex flex-col self-center gap-2.5'>
						<p className=' font-semibold text-secondary-text-color text-sm'>
							{productName}
						</p>
						{productSize && (
							<p className=' font-semibold text-secondary-text-color text-sm'>
								Size: {productSize}
							</p>
						)}
						{productColor && (
							<p className=' font-semibold text-secondary-text-color text-sm'>
								Color: {productColor}
							</p>
						)}
					</div>
				</div>
				<p className='font-semibold text-sm price'>
					Price: {formatPrice(unitPrice)}
				</p>
				<div className='counter_card border border-[#e4e6e6] flex items-center w-24 h-8 gap-4'>
					<button aria-label='Decrease quantity' className='grow-0 disabled:opacity-30'
						disabled={productQuantity <= 1} onClick={decreaseQuantity}>
						<LuMinus className='cursor-pointer' size={18} />
					</button>
					<p className='font-semibold bg-[#f2f2f2] text-center  w-10 grow'>
						{productQuantity}
					</p>
					<button aria-label='Increase quantity' className='grow-0' onClick={increaseQuantity}>
						<LuPlus className='cursor-pointer' size={18} />
					</button>
				</div>
				<p className='font-semibold text-sm'>
					Total: {formatPrice(lineTotal)}
				</p>
			</section>
		</main>
	);
}

export default MobileCartCard;
