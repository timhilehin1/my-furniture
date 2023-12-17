import React from "react";
import Image from "next/image";

function NewsCard() {
	return (
		<section className='flex mt-8 px-6 items-center flex-col gap-8 semiLarge:justify-between semiLarge:flex-row'>
			<Image
				src={"/newsImage2.png"}
				priority={true}
				alt='image'
				width={0}
				height={0}
				sizes='100%'
				style={{ width: "100%", height: "auto" }}
			/>

			<div className='flex flex-col gap-4 self-center'>
				<p className='text-secondary-text-color text-sm'>
					Dec 17, 2023 <span className='text-black'>By Oladapo Timilehin</span>
				</p>
				<header className='text-xl font-medium hover:text-secondary-color cursor-pointer'>This is my furniture story</header>
				<main className='text-secondary-text-color text-sm'>
					Valentines Day 2021 has no choice but to unfold rather differently
					than usual, so we already know it will be one to remember. Lorem ipsum
					dolor sit amet, consectetur adipisicing elit, do eiusmod tempor
					incididunt ut labore et dolore mag...
				</main>
				<button className='border-solid  border-2 border-black hover:bg-secondary-color hover:border-secondary-color rounded-md py-2 px-2.5 md:py-2.5 md:px-4  text-xs md:text-sm self-center semiLarge:self-start hover:text-primary-color'>
					Read More
				</button>
			</div>
		</section>
	);
}

export default NewsCard;
