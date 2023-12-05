"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import NewsletterDialog from "./NewsletterDialog";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default function Hero() {
	return (
		<section className=' h-screen relative flex justify-center'>
			<div className='h-full w-full object-cover absolute'>
				<Swiper
					spaceBetween={30}
					effect={"fade"}
					navigation={true}
					pagination={{
						clickable: true,
					}}
					freeMode={true}
					loop={true}
					modules={[EffectFade, Navigation, Pagination]}
					className='mySwiper'
				>
					<SwiperSlide>
						<Image
							src={"/furniture-hero2.png"}
							alt='Hero Image'
							width={0}
							height={0}
							sizes='100vw'
							style={{ width: "100%", height: "auto"}}
						/>
					</SwiperSlide>

					<SwiperSlide>
						<Image
							src={"/furniture-hero.png"}
							alt='Hero Image'
							width={0}
							height={0}
							sizes='100vw'
							style={{ width: "100%", height: "auto"}}
						/>
					</SwiperSlide>
				</Swiper>
			</div>
			<div className='text-primary-color   flex flex-col z-10 top-4  md:top-40 relative gap-2 xl:gap-4'>
				<h3 className='text-lg md:text-3xl self-center'>Modern Living Room</h3>
				<p className='md:text-sm text-xs'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit
				</p>
				<button className='border-solid  border-2 border-primary-color hover:bg-secondary-color hover:border-secondary-color rounded-md py-1.5 px-2 md:py-2.5 md:px-4  text-xs md:text-sm self-center'>
					Learn More
				</button>
				<NewsletterDialog />
			</div>
		</section>
	);
}
