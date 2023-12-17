import React, { useCallback, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

function NewArrivals() {
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
						freeMode={true}
						loop={true}
						autoplay={{
							delay: 10000,
							disableOnInteraction: true,
						}}
						className='mySwiper'
					>
						<SwiperSlide>
							<Image
								src={"/newArrival1.png"}
								alt='new arrival image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
						</SwiperSlide>
						<SwiperSlide>
							<Image
								src={"/newArrival2.png"}
								alt='new arrival image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
						</SwiperSlide>
						<SwiperSlide>
							<Image
								src={"/newArrival3.png"}
								alt='new arrival image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
						</SwiperSlide>
					</Swiper>
				</section>
				<section className='w-full semiLarge:w-9/12 grid grid-cols-2 semiLarge:grid-cols-3 gap-4'>
					<Image
						src={"/item1.png"}
						alt='image'
						width={0}
						height={0}
						sizes='100%'
						style={{ width: "100%", height: "auto" }}
					/>
					<Image
						src={"/item2.png"}
						alt='image'
						width={0}
						height={0}
						sizes='100%'
						style={{ width: "100%", height: "auto" }}
					/>
					<Image
						src={"/item3.png"}
						alt='image'
						width={0}
						height={0}
						sizes='100%'
						style={{ width: "100%", height: "auto" }}
					/>
					<Image
						src={"/item4.png"}
						alt='image'
						width={0}
						height={0}
						sizes='100%'
						style={{ width: "100%", height: "auto" }}
					/>
					<Image
						src={"/item5.png"}
						alt='image'
						width={0}
						height={0}
						sizes='100%'
						style={{ width: "100%", height: "auto" }}
					/>
					<Image
						src={"/item6.png"}
						alt='image'
						width={0}
						height={0}
						sizes='100%'
						style={{ width: "100%", height: "auto" }}
					/>
				</section>
			</div>
		</section>
	);
}

export default NewArrivals;
