"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import NewsletterDialog from "./NewsletterDialog";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchHero } from "@/sanity/sanity.query";
import { HeroInterface } from "@/interfaces/hero.interface";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

export default function Hero() {
	const [hero, setHero] = useState<HeroInterface[]>([]);
	useEffect(() => {
		getHero();
	}, []);
	const getHero = async () => {
		try {
			const data = await fetchHero();
			// console.log(data);
			setHero(data);
		} catch (err) {
			setHero([]);
			// console.log(err);
		}
	};
	return (
		<>
			{hero.length > 0 ? (
				<section className="relative w-full h-full  flex justify-center">
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
						className="mySwiper absolute h-full w-full"
					>
						<SwiperSlide>
							<Image
								className="w-full h-auto"
								priority={true}
								src={hero[0]?.firstHeroImage}
								alt="Hero Image"
								width={0}
								height={0}
								sizes="100vw"
							/>
						</SwiperSlide>

						<SwiperSlide>
							<Image
								className="w-full h-auto"
								priority={true}
								src={hero[0]?.secondHeroImage}
								alt="Hero Image"
								width={0}
								height={0}
								sizes="100vw"
							/>
						</SwiperSlide>
					</Swiper>

					<div className="text-primary-color   flex flex-col z-10 top-4  md:top-40 absolute gap-2 xl:gap-4">
						<h3 className="text-lg md:text-5xl self-center">
							{hero[0]?.heroTitle}
						</h3>
						<p className="md:text-lg md:text-center text-xs">{hero[0]?.heroDescription}</p>
						<button className="border-solid  border-2 border-primary-color hover:bg-secondary-color hover:border-secondary-color rounded-md py-1.5 px-2 md:py-2.5 md:px-4  text-xs md:text-sm self-center">
							Learn More
						</button>
						<NewsletterDialog />
					</div>
				</section>
			) : (
				<Skeleton height={600} duration={2} baseColor={"#e6e8ec"} />
			)}
		</>
	);
}
