import React from "react";
import Image from "next/image";
import { PromoCardInterface } from "@/interfaces/promoCard.interface";
import { motion } from "framer-motion";

function PromoCard({ title, subtitle, image, darkMode }: PromoCardInterface) {
	const splitTitle = title.split(" ");
	return (
		<section className='bg-[#ececec] w-full relative'>
			<div className='flex flex-col gap-4 semiLarge:gap-3 absolute top-12 left-8 semiLarge:left-2 semiLarge:top-4 lg:top-12 lg:left-8 lg:gap-4'>
				<p
					className={`font-black ${
						darkMode ? "text-white" : ""
					} md:text-xl text-lg`}
				>
					<span className={darkMode ? "text-[#aa8453]" : "text-[#0a5d5d]"}>
						{splitTitle[0]}
					</span>{" "}
					{splitTitle[1]}
				</p>
				<p className='text-secondary-text-color text-base italic'>{subtitle}</p>
				<button
					className={`p-2  text-base ${
						darkMode ? "bg-[#fff] text-[#2c2c2c]" : "bg-[#2c2c2c] text-white"
					} cursor-pointer`}
				>
					SHOP NOW
				</button>
			</div>
			<div className='h-full w-full object-cover'>
				{/* <motion.button whileHover={{ scale: 1.1 }}> */}
					<Image
						src={image}
						alt='Hero Image'
						width={0}
						height={0}
						sizes='100%'
						style={{ width: "100%", height: "auto" }}
					/>
				{/* </motion.button> */}
			</div>
		</section>
	);
}

export default PromoCard;
