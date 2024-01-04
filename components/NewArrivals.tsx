"use client";
import React, { useCallback, useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { fetchProducts, fetchGalleryImages } from "@/sanity/sanity.query";
import {
	ProductInterface,
	imageInterface,
	ProductSectionInterface,
} from "@/interfaces/product.interface";
import { calculateDiscount } from "@/utils/utils";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { IoCartOutline, IoStarOutline, IoStarSharp } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";

function NewArrivals() {
	useEffect(() => {
		getData();
		getGalleryImages();
	}, []);
	const [newArrivals, setNewArrivals] = useState<ProductInterface[]>([]);
	const [galleryImages, setGalleryImages] = useState<imageInterface[]>([]);
	const new_arrivals = "ARRIVALS";
	const numArr = [1];
	const numArrayAlt = [1, 2, 3, 4, 5, 6];

	const getData = async () => {
		try {
			const data = await fetchProducts();
			// console.log(data);
			const newlyArrivedProducts = data.filter((item: ProductInterface) =>
				item.productSection.some(
					(section: ProductSectionInterface) =>
						section.sectionName === new_arrivals
				)
			);
			if (newlyArrivedProducts.length <= 0) {
				alert("No new arrivals yet");
				setNewArrivals([]);
				return;
			} else {
				setNewArrivals(newlyArrivedProducts);
			}
		} catch (err) {
			console.log(err);
			setNewArrivals([]);
		}
	};

	const getGalleryImages = async () => {
		try {
			const data = await fetchGalleryImages();
			console.log(data[0].images);
			setGalleryImages(data[0].images);
		} catch (err) {
			console.log(err);
			setGalleryImages([]);
		}
	};

	//it works sha
	const sliderRef = useRef(null);
	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;
		(sliderRef.current as any)?.swiper.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;
		(sliderRef.current as any)?.swiper.slideNext();
	}, []);
	return (
		<section className='mt-8 p-4'>
			<header className='font-semibold text-base mt-4 md:text-3xl text-center'>
				New Arrivals
			</header>
			<div className='flex flex-col semiLarge:flex-row gap-4 mt-8'>
				<section className='h-full  object-cover w-full semiLarge:w-1/4 relative'>
					{galleryImages.length > 0 ? (
						<div className='button_group flex gap-4 absolute right-1 bottom-1 z-20'>
							<button
								onClick={handlePrev}
								className='bg-primary-color border-2 border-secondary-color text-secondary-color rounded p-3'
							>
								<MdOutlineChevronLeft size={24} />
							</button>
							<button
								onClick={handleNext}
								className='bg-primary-color border-2 border-secondary-color text-secondary-color rounded p-3'
							>
								<MdOutlineChevronRight size={24} />
							</button>
						</div>
					) : null}
					<div className='button_group flex gap-4 absolute right-1 bottom-1 z-20'>
						<button
							onClick={handlePrev}
							className='bg-primary-color border-2 border-secondary-color text-secondary-color rounded p-3'
						>
							<MdOutlineChevronLeft size={24} />
						</button>
						<button
							onClick={handleNext}
							className='bg-primary-color border-2 border-secondary-color text-secondary-color rounded p-3'
						>
							<MdOutlineChevronRight size={24} />
						</button>
					</div>
					<Swiper
						ref={sliderRef}
						spaceBetween={30}
						slidesPerView={1}
						// freeMode={true}
						// loop={true}
						autoplay={{
							delay: 10000,
							disableOnInteraction: true,
						}}
						className='mySwiper'
					>
						{galleryImages.length > 0
							? galleryImages.map((item, index) => (
									<SwiperSlide key={index}>
										<Image
											key={index}
											priority={true}
											src={item?.imageUrl}
											alt={item?.attribution}
											width={0}
											height={0}
											sizes='100%'
											style={{
												width: "100%",
												height: "auto",
												objectFit: "cover",
											}}
										/>
									</SwiperSlide>
							  ))
							: numArr.map((el) => (
									<>
										<Skeleton
											containerClassName='flex-1'
											height={580}
											duration={2}
											baseColor={"#e6e8ec"}
										/>
									</>
							  ))}
					</Swiper>
				</section>
				<section className='w-full semiLarge:w-9/12 grid grid-cols-2 semiLarge:grid-cols-3 gap-6'>
					{newArrivals.length > 0
						? newArrivals.map((item, index) => (
								// card component begins here
								<div key={index} className='cursor-pointer relative group card'>
									<>
										{/* discount percentage */}
										{item?.discountStatus && item?.discountPrice !== null ? (
											<div className='discount-percentage text-white text-sm inline-block absolute left-2 top-2 bg-red-700  p-1.5 rounded-md'>
												-
												{calculateDiscount(
													item?.productPrice,
													item?.discountPrice
												)}
											</div>
										) : null}
										{/* wishlist and preview buttons */}
										<section className='flex flex-col gap-5 semiLarge:gap-3 absolute right-2.5 semiLarge:right-5 top-2 text-secondary-color z-50'>
											<Tooltip title='Quick Add' placement='top' arrow>
												<div className='bg-primary-color h-8 w-8 rounded-[50%] flex justify-center items-center hover:bg-secondary-color hover:text-primary-color'>
													<IoCartOutline size={16} />
												</div>
											</Tooltip>
											<Tooltip title='Add To Wishlist' placement='top' arrow>
												<div className='bg-primary-color h-8 w-8 rounded-[50%] flex justify-center items-center hover:bg-secondary-color hover:text-primary-color'>
													<IoStarOutline size={16} />
												</div>
											</Tooltip>

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
										{/* <section className='images-container border border-black'> */}
											<div className=''>
												<Image
													src={
														item?.productImages[1]?.imageUrl ||
														item?.productImages[0]?.imageUrl
													}
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

											{/* <div className="border-solid border border-sky-500  opacity-0 group-hover:opacity-100">
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
										{/* </section> */}
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
										<p className='text-center'>{item?.productName}</p>
										<div className='flex flex-row gap-2 group-hover:invisible'>
											<p
												className={
													item?.discountPrice
														? "line-through text-sm text-secondary-text-color decoration-red-700 font-semibold"
														: "text-sm text-black font-semibold"
												}
											>
												${item?.productPrice}
											</p>
											{item?.discountPrice && (
												<p className='text-sm text-black font-semibold'>{`$${item?.discountPrice}`}</p>
											)}
										</div>
										<button className='w-full text-secondary-color p-2 border-solid border border-secondary-color opacity-0 group-hover:opacity-100'>
											Quick Add
										</button>
									</div>
								</div>
						  ))
						: numArrayAlt.map((el) => (
								<>
									<Skeleton
										containerClassName='flex-1'
										height={360}
										duration={2}
										baseColor={"#e6e8ec"}
									/>
								</>
						  ))}
				</section>
			</div>
		</section>
	);
}

export default NewArrivals;
