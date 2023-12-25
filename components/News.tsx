"use client";
import React, { useCallback, useRef } from "react";
import NewsCard from "./NewsCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function News() {
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
		<section className='mt-8 p-4 relative'>
			<header className='font-semibold text-base mt-4 md:text-3xl text-center'>
				Latest News
			</header>
			<p
				onClick={handlePrev}
				className='absolute hidden semiLarge:block cursor-pointer text-secondary-text-color top-1/2 left-3 z-10'
			>
				<FaAngleLeft size={30} />
			</p>
			<p
				onClick={handleNext}
				className='absolute hidden  semiLarge:block z-10 cursor-pointer text-secondary-text-color top-1/2 right-4'
			>
				<FaAngleRight size={30} />
			</p>
			<Swiper
				slidesPerView={1}
				ref={sliderRef}
				spaceBetween={30}
				freeMode={true}
				loop={true}
				autoplay={{
					delay: 10000,
					disableOnInteraction: true,
				}}
				modules={[FreeMode]}
				className='swiper'
			>
				<SwiperSlide>
					<NewsCard />
				</SwiperSlide>
				<SwiperSlide>
					<NewsCard />
				</SwiperSlide>
				<SwiperSlide>
					<NewsCard />
				</SwiperSlide>
			</Swiper>
			<div className="flex gap-4 justify-center mt-4 items-center semiLarge:hidden">
				<p
					onClick={handlePrev}
					className='cursor-pointer text-secondary-text-color'
				>
					<FaAngleLeft size={24} />
				</p>
				<p
					onClick={handleNext}
					className='cursor-pointer text-secondary-text-color'
				>
					<FaAngleRight size={24} />
				</p>
			</div>
		</section>
	);
}

export default News;
