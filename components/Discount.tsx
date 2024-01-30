"use client";
import React, { useEffect, useState } from "react";
import PromoCard from "./PromoCard";
import { getDiscountProducts } from "@/sanity/sanity.query";
import { DiscountCardInterface } from "@/interfaces/discountCard.interface";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

function Discount() {
	const [products, setProducts] = useState<DiscountCardInterface[]>([]);
	useEffect(() => {
		getData();
	}, []);
	const numArr = [1, 2, 3];

	const getData = async () => {
		//implement error boundary so one there is an issue with a component, it doesn't affect the whole app
		try {
			const data = await getDiscountProducts();
			console.log(data[0].products);
			setProducts(data[0].products);
		} catch (err) {
			console.log(err);
			setProducts([]);
		}
	};

	return (
		<>
			{products.length <= 0 ? (
				<div className='p-4 mt-0 flex flex-col md:flex-row gap-4 justify-between'>
					{numArr.map((el) => (
						<>
							<Skeleton
							   key={el}
								containerClassName='flex-1'
								height={150}
								duration={2}
								baseColor={"#e6e8ec"}
							/>
						</>
					))}
				</div>
			) : (
				<section className='p-4 mt-0 flex flex-col md:flex-row gap-4 justify-between'>
					{products.map((product) =>
						product.darkMode ? (
							<PromoCard
								key={product._id}
								productName={product.productName}
								discountPercentage={product.discountPercentage}
								productImage={product.productImage}
								darkMode={product.darkMode}
							/>
						) : (
							<PromoCard
								key={product._id}
								productName={product.productName}
								discountPercentage={product.discountPercentage}
								productImage={product.productImage}
							/>
						)
					)}
				</section>
			)}
		</>
	);
}

export default Discount;
