"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { imageInterface } from "@/interfaces/product.interface";
import { fetchDiscoveryImages } from "@/sanity/sanity.query";

function Discovery() {
	const [discoveryImages, setDiscoveryImages] = useState<imageInterface[]>([]);
	const numArr = [1, 2];
	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			const data = await fetchDiscoveryImages();
			// console.log(data[0].images);
			setDiscoveryImages(data[0].images);
		} catch (err) {
			// console.log(err);
			setDiscoveryImages([]);
		}
	};
	return (
		<section className='mt-8 p-4 flex w-full gap-8 flex-col semiLarge:flex-row'>
			{discoveryImages.length <= 0
				? numArr.map((el, index) => (
						<div key={index}>
							<Skeleton
								containerClassName='flex-1'
								height={250}
								duration={2}
								baseColor={"#e6e8ec"}
							/>
						</div>
				  ))
				: discoveryImages.map((image) => (
						<Image
							src={image.imageUrl}
							alt={image.attribution}
							width={0}
							height={0}
							sizes='100%'
							style={{ width: "100%", height: "auto" }}
						/>
				  ))}
		</section>
	);
}

export default Discovery;
