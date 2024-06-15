"use client";
import React from "react";
import Image from "next/image";
import { ProductCardInterface } from "@/interfaces/product.interface";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { calculateDiscount } from "@/utils/utils";
import { IoCartOutline } from "react-icons/io5";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import Link from "next/link";
import { getNairaFormat } from "@/utils/utils";

function ProductCard({
	discountStatus,
	discountPrice,
	productPrice,
	productImages,
	productName,
	_id,
	slug,
	mode,
	handleAddToWishlist,
	handleRemoveFromWishlist,
	handleAddToCart,
	isAlreadyInWishList,
}: ProductCardInterface) {
	return (
		<Link href={`/products/${slug}`}>
			<div className='cursor-pointer relative group card'>
				<>
					{/* discount percentage */}
					{discountStatus && discountPrice !== null ? (
						<div className='discount-percentage text-white text-sm inline-block absolute z-50 left-2 top-2 bg-red-700  p-1.5 rounded-md'>
							-{calculateDiscount(productPrice, discountPrice)}
						</div>
					) : null}
					{/* wishlist and preview buttons */}
					<section className='flex flex-col gap-5 semiLarge:gap-3 absolute right-2.5 semiLarge:right-5 top-2 text-secondary-color z-50 opacity-100  semiLarge:opacity-0 group-hover:opacity-100 transition duration-150 ease-in-out'>
						{/* //display add to cart icon conditionally */}
						{mode === "wishlist" ? null : (
							<Tooltip title='Quick Add' placement='top' arrow>
								<div
									onClick={handleAddToCart}
									className='bg-primary-color h-8 w-8 rounded-[50%] flex justify-center items-center hover:bg-secondary-color hover:text-primary-color'
								>
									<IoCartOutline size={16} />
								</div>
							</Tooltip>
						)}

						{isAlreadyInWishList ? (
							<Tooltip title='Remove from Wishlist' placement='top' arrow>
								<div
									onClick={handleRemoveFromWishlist}
									className='bg-secondary-color h-8 w-8 rounded-[50%] flex justify-center items-center text-primary-color'
								>
									<FaStar size={16} />
								</div>
							</Tooltip>
						) : (
							<Tooltip title='Add To Wishlist' placement='top' arrow>
								<div
									onClick={handleAddToWishlist}
									className='bg-primary-color h-8 w-8 rounded-[50%] flex justify-center items-center hover:bg-secondary-color hover:text-primary-color'
								>
									<FaRegStar size={16} />
								</div>
							</Tooltip>
						)}

						<Tooltip
							sx={{ backgroundColor: "#000" }}
							title='Quick View'
							placement='top'
							arrow
						>
							<div className='bg-primary-color hidden semiLarge:flex h-8 w-8 rounded-[50%]  justify-center items-center hover:bg-secondary-color hover:text-primary-color'>
								<CiImageOn size={16} />
							</div>
						</Tooltip>
					</section>

					{/* product images */}
					<section className='images-container  relative'>
						<div className=''>
							<Image
								src={productImages[0]?.imageUrl}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{
									width: "100%",
									height: "auto",
									objectFit: "cover",
								}}
							/>
						</div>

						{/* <div className='border-solid absolute w-full h-full border border-sky-500  opacity-0 group-hover:opacity-100'>
        <Image
          src={item?.productImages[1]?.imageUrl}
          alt='image'
          width={0}
          height={0}
          sizes='100%'
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </div> */}
					</section>
				</>
				{/* pricing */}
				<div className='flex flex-col gap-1 justify-center items-center'>
					<Stack spacing={1}>
						<Rating
							name='half-rating-read'
							defaultValue={3}
							size='small'
							// precision={0.5}
							readOnly
						/>
					</Stack>
					<p className='text-center'>{productName}</p>
					<div className='flex flex-row gap-2 '>
						<p
							className={
								discountPrice
									? "line-through text-sm text-secondary-text-color decoration-red-700 font-semibold"
									: "text-sm text-black font-semibold"
							}
						>
							{getNairaFormat(productPrice.toString())}
						</p>
						{discountPrice && (
							<p className='text-sm text-black font-semibold'>
								{getNairaFormat(discountPrice.toString())}
							</p>
						)}
					</div>
					<button onClick={handleAddToCart} className='w-full text-secondary-color p-2 border-solid border border-secondary-color opacity-0 lg:group-hover:opacity-100 hover:bg-secondary-color hover:text-primary-color'>
						Quick Add
					</button>
				</div>
			</div>
		</Link>
	);
}

export default ProductCard;
