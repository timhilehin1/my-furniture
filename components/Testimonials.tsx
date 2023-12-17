import React from "react";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";

function Testimonials() {
	return (
		<section className='mt-8 p-4'>
			<header className='font-semibold text-base mt-4 md:text-3xl text-center'>
				Testimonials
			</header>

			<main className='mt-8 flex justify-between gap-4'>
				<Swiper
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    400:{
                      slidesPerView:1,
                    },
                    576: {
                      slidesPerView: 1,
                    },
                    768:{
                      slidesPerView:2
                    },
                    1000:{
                      slidesPerView:3
                    },
                    1500:{
                      slidesPerView:3
                    },
                    1700:{
                      slidesPerView:3
                    }
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
					<SwiperSlide>
						<TestimonialCard />
					</SwiperSlide>
					<SwiperSlide>
						<TestimonialCard />
					</SwiperSlide>
					<SwiperSlide>
						<TestimonialCard />
					</SwiperSlide>
                    <SwiperSlide>
						<TestimonialCard />
					</SwiperSlide>
					<SwiperSlide>
						<TestimonialCard />
					</SwiperSlide>
				</Swiper>
			</main>
		</section>
	);
}

export default Testimonials;
