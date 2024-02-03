"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProductInterface } from "@/interfaces/product.interface";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { fetchDealOfTheDay } from "@/sanity/sanity.query";

function Deals() {
	useEffect(() => {
		getData();
	}, []);
	const [deal, setDeal] = useState<ProductInterface[]>([]);
	const getData = async () => {
		try {
			const data = await fetchDealOfTheDay();
			setDeal(data);
		} catch (err) {
			// console.log(err);
			setDeal([]);
		}
	};
	return (
		<section className='bg-zinc-200 flex mt-12 mx-4 p-6 items-center flex-col gap-8 semiLarge:justify-between semiLarge:flex-row'>
			{deal.length <= 0 ? (
				<Skeleton
					containerClassName='flex-1'
					height={250}
					duration={2}
					baseColor={"#e6e8ec"}
				/>
			) : (
				<>
					<div className='w-full semilarge:w-1/2'>
						<Image
							src={deal[0].productImages[0].imageUrl}
							priority={true}
							alt={deal[0].productImages[0].attribution || "image"}
							width={0}
							height={0}
							sizes='100%'
							style={{ width: "100%", height: "auto", objectFit: "cover" }}
						/>
					</div>

					<div className='w-full semilarge:w-1/2 flex flex-col gap-4 self-center'>
						<header className='text-3xl font-medium  cursor-pointer'>
							Deal of The Day
						</header>
						<main className='text-secondary-text-color text-base'>
							{deal[0].productDescription}
						</main>
						<button className='border-none  text-primary-color bg-secondary-color  border-2 hover:bg-secondary-color hover:border-secondary-color rounded-md py-2 px-4 md:py-2.5 md:px-4 text-base md:text-lg self-center semiLarge:self-start hover:text-primary-color'>
							Shop Now
						</button>
					</div>
				</>
			)}
		</section>
	);
}

export default Deals;
