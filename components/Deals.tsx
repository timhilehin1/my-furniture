import React from "react";
import Image from "next/image";

function Deals() {
	return (
		<section className='bg-zinc-200 flex mt-12 mx-4 p-6 items-center flex-col gap-8 semiLarge:justify-between semiLarge:flex-row'>
			<Image
				src={"/deal.png"}
				priority={true}
				alt='image'
				width={0}
				height={0}
				sizes='100%'
				style={{ width: "100%", height: "auto" }}
			/>

			<div className='flex flex-col gap-4 self-center'>
				<header className='text-3xl font-medium  cursor-pointer'>
					Deal of The Day
				</header>
				<main className='text-secondary-text-color text-base'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
				</main>
				<button className='border-none  text-primary-color bg-secondary-color  border-2 hover:bg-secondary-color hover:border-secondary-color rounded-md py-2 px-4 md:py-2.5 md:px-4 text-base md:text-lg self-center semiLarge:self-start hover:text-primary-color'>
					Shop Now
				</button>
			</div>
		</section>
	);
}

export default Deals;
