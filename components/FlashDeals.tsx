"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { fetchProducts } from "@/sanity/sanity.query";
import {
	ProductInterface,
	ProductSectionInterface,
} from "@/interfaces/product.interface";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

function FlashDeals() {
	useEffect(() => {
		getData();
	}, []);
	const numArrayAlt = [1, 2, 3];
	const sliderRef = useRef(null);
	const [flashDeals, setFlashDeals] = useState<ProductInterface[]>([]);
	const flash_deals = "FLASH DEALS";

	const getData = async () => {
		try {
			const data = await fetchProducts();
			const flashDealProducts = data.filter((item: ProductInterface) =>
				item.productSection.some(
					(section: ProductSectionInterface) =>
						section.sectionName === flash_deals
				)
			);
			if (flashDealProducts.length <= 0) {
				alert("No new deals yet");
				setFlashDeals([]);
				return;
			} else {
				setFlashDeals(flashDealProducts);
			}
		} catch (err) {
			console.log(err);
			setFlashDeals([]);
		}
	};
	// console.log(flashDeals);
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
			<header className='font-semibold text-base mt-4 md:text-3xl text-center flex gap-8 justify-center items-center'>
				<p
					onClick={handlePrev}
					className='cursor-pointer text-secondary-text-color'
				>
					<FaAngleLeft size={30} />
				</p>
				<p>Flash Deals</p>
				<p
					onClick={handleNext}
					className='cursor-pointer text-secondary-text-color'
				>
					<FaAngleRight size={30} />
				</p>
			</header>

			{/* //there should be a timer in this component */}
			<main className='mt-8 flex justify-between gap-4'>
				{flashDeals.length <= 0 ? (
					<Skeleton
						// key={el}
						containerClassName='flex-1'
						height={580}
						// count={3}
						duration={2}
						baseColor={"#e6e8ec"}
					/>
				) : (
					// <div className='flex flex-col semiLarge:flex-row  gap-4 justify-between'>
					// 	{numArrayAlt.map((el) => (
					// 		<>
					// 			<Skeleton
					// 				key={el}
					// 				containerClassName='flex-1'
					// 				height={580}
					// 				count={3}
					// 				duration={2}
					// 				baseColor={"#e6e8ec"}
					// 			/>
					// 		</>
					// 	))}
					// </div>
					<Swiper
						breakpoints={{
							0: {
								slidesPerView: 1,
							},
							400: {
								slidesPerView: 1,
							},
							576: {
								slidesPerView: 1,
							},
							768: {
								slidesPerView: 3,
							},
							1000: {
								slidesPerView: 4,
							},
						}}
						ref={sliderRef}
						spaceBetween={30}
						freeMode={true}
						loop={true}
						autoplay={{
							delay: 10000,
							disableOnInteraction: true,
						}}
						modules={[FreeMode]}
						className='dealsSwiper'
					>
						{flashDeals.map((item, index) => (
							<SwiperSlide key={index}>
								<Image
									key={index}
									src={item?.productImages[0].imageUrl}
									alt='image'
									width={0}
									height={0}
									sizes='100%'
									style={{ width: "100%", height: "auto" }}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</main>
		</section>
	);
}

export default FlashDeals;
