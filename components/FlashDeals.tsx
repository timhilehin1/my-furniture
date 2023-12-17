import React, { useCallback, useRef } from "react";
import ProductCard from "./ProductCard";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function FlashDeals() {
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
					<SwiperSlide>
						<Image
							src={"/flash1.png"}
                            priority={true}
							alt='image'
							width={0}
							height={0}
							sizes='100%'
							style={{ width: "100%", height: "auto" }}
						/>
					</SwiperSlide>

					<SwiperSlide>
						<Image
							src={"/flash4.png"}
                            priority={true}
							alt='image'
							width={0}
							height={0}
							sizes='100%'
							style={{ width: "100%", height: "auto" }}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<Image
							src={"/flash5.png"}
                            priority={true}
							alt='image'
							width={0}
							height={0}
							sizes='100%'
							style={{ width: "100%", height: "auto" }}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<Image
							src={"/flash6.png"}
                            priority={true}
							alt='image'
							width={0}
							height={0}
							sizes='100%'
							style={{ width: "100%", height: "auto" }}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<Image
							src={"/flash6.png"}
                            priority={true}
							alt='image'
							width={0}
							height={0}
							sizes='100%'
							style={{ width: "100%", height: "auto" }}
						/>
					</SwiperSlide>
				</Swiper>
			</main>
		</section>
	);
}

export default FlashDeals;
