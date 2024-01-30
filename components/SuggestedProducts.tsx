import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
	ProductInterface,
	ProductSectionInterface,
} from "@/interfaces/product.interface";
import { fetchProducts } from "@/sanity/sanity.query";
import { getNairaFormat } from "@/utils/utils";
import Link from "next/link";
function SuggestedProducts() {
	useEffect(() => {
		getProducts();
	}, []);
	const [suggestedProducts, setSuggestedProducts] = useState<
		ProductInterface[]
	>([]);
	const suggested = "SUGGESTED";

	const getProducts = async () => {
		try {
			const data = await fetchProducts();
			// console.log(data);
			const suggestedProducts = data.filter((item: ProductInterface) =>
				item.productSection.some(
					(section: ProductSectionInterface) =>
						section.sectionName === suggested
				)
			);
			if (suggestedProducts.length <= 0) {
				alert("No suggested products yet");
				setSuggestedProducts([]);
				return;
			} else {
				setSuggestedProducts(suggestedProducts);
			}
		} catch (err) {}
	};
	return (
		<section className='lg:flex grid grid-cols-2  gap-6 mt-6'>
			{suggestedProducts.length > 0 ? (
				suggestedProducts.map((item) => (
					<Link href={`/products/${item?.slug}`}>
						<div className='flex flex-col gap-2'>
							<Image
								className='cursor-pointer'
								src={item?.productImages[0]?.imageUrl}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{
									width: "100%",
									height: "auto",
									objectFit: "cover",
								}}
							/>
							<p className='font-medium text-sm text-center'>
								{item?.productName}
							</p>
							<div className='flex justify-center gap-4 items-center'>
								<p
									className={
										item?.discountPrice !== null
											? "line-through text-secondary-text-color decoration-red-700 text-sm font-semibold decoration-2"
											: "text-sm font-semibold text-black"
									}
								>
									{getNairaFormat(item?.productPrice.toString())}
								</p>
								{item?.discountPrice !== null && (
									<p className='text-sm font-bold text-black'>
										{getNairaFormat(item?.discountPrice?.toString() ?? "")}
									</p>
								)}
							</div>
						</div>
					</Link>
				))
			) : (
				<p>No suggested products yet</p>
			)}
		</section>
	);
}

export default SuggestedProducts;
