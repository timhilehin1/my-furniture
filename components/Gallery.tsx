"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { imageInterface } from "@/interfaces/product.interface";
import { fetchGramImages } from "@/sanity/sanity.query";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
function Gallery() {
	useEffect(() => {
		getImages();
	}, []);
	const [images, setImages] = useState<imageInterface[]>([]);
	const numArr = [1, 2, 3, 4];
	const getImages = async () => {
		try {
			const data = await fetchGramImages();
			// console.log(data[0].images);
			setImages(data[0].images);
		} catch (err) {
			// console.log(err);
			setImages([]);
		}
	};
	return (
		<>
			{images.length <= 0 ? (
				<div className='p-4 mt-0 flex flex-col md:flex-row gap-4 justify-between'>
					{numArr.map((el) => (
						<div key={el}>
							<Skeleton
								containerClassName='flex-1'
								height={250}
								duration={2}
								baseColor={"#e6e8ec"}
							/>
						</div>
					))}
				</div>
			) : (
				<section className='mt-12 p-4'>
					<header className='font-semibold text-base mt-4 md:text-3xl text-center'>
						Gram Gallery
					</header>

					<main className='grid grid-cols-3 semiLarge:flex semiLarge:flex-row semiLarge:justify-between px-4 gap-4 mt-8'>
						{images.map((image, index) => (
							<Image
								key={index}
								src={image.imageUrl || ""}
								priority={true}
								alt={image.attribution || "image"}
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto", objectFit: "cover" }}
							/>
						))}
					</main>
				</section>
			)}
		</>
	);
}

export default Gallery;
