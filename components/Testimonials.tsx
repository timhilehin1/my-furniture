"use client";
import React, { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { TestimonialInterface } from "@/interfaces/testimonial.interface";
import { fetchTestimonials } from "@/sanity/sanity.query";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";

function Testimonials() {
	useEffect(() => {
		getData();
	}, []);
	const [testimonials, setTestimonials] = useState<TestimonialInterface[]>([]);
	const numArr = [1];

	const getData = async () => {
		try {
			const data = await fetchTestimonials();
			console.log(data);
			setTestimonials(data);
		} catch (err) {
			console.log(err);
			setTestimonials([]);
		}
	};
	return (
		<section className='mt-8 p-4'>
			<header className='font-semibold text-base mt-4 md:text-3xl text-center'>
				Testimonials
			</header>

			<main className='mt-8 flex justify-between gap-4'>
				{testimonials.length <= 0 ? (
					numArr.map((el) => (
						<>
							<Skeleton
								key={el}
								containerClassName='flex-1'
								height={400}
								duration={2}
								count={1}
								baseColor={"#e6e8ec"}
							/>
						</>
					))
				) : (
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
								slidesPerView: 2,
							},
							1000: {
								slidesPerView: 3,
							},
							1500: {
								slidesPerView: 3,
							},
							1700: {
								slidesPerView: 3,
							},
						}}
						slidesPerView={3}
						spaceBetween={30}
						freeMode={true}
						pagination={{
							clickable: true,
						}}
						modules={[FreeMode, Pagination]}
						className='mySwiper'
					>
						{testimonials.map((el: TestimonialInterface, index) => (
							<SwiperSlide key={index}>
								<TestimonialCard
									testimonialImage={el.testimonialImage}
									testimonialName={el.testimonialName}
									testimonialText={el.testimonialText}
									testimonialDesignation={el.testimonialDesignation}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</main>
		</section>
	);
}

export default Testimonials;
