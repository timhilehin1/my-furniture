"use client";
import React, { useState, useEffect } from "react";
import TrendingProducts from "./TrendingProducts";
import SaleOffProducts from "./SaleOffProducts";
import HotProducts from "./HotProducts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
	ProductInterface,
	ProductSectionInterface,
} from "@/interfaces/product.interface";
import { fetchProducts } from "@/sanity/sanity.query";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
function OurProducts() {
	useEffect(() => {
		getData("HOT");
	}, []);
	const [value, setValue] = useState<number>(0);
	const [products, setProducts] = useState<ProductInterface[]>([]);
	const getData = async (filter: string) => {
		try {
			const data = await fetchProducts();
			if (filter === "ALL") {
				setProducts(data);
				return;
			}
			const filteredProducts = data.filter((item: ProductInterface) =>
				item.productSection.some(
					(section: ProductSectionInterface) => section.sectionName === filter
				)
			);
			// console.log(filteredProducts);
			if (filteredProducts.length <= 0 || data.length <= 0) {
				alert(`No ${filter} products yet`);
				setProducts([]);
				return;
			} else {
				setProducts(filteredProducts);
			}
		} catch (err) {
			console.log(err);
			setProducts([]);
		}
	};
	//accessibility prop for screen readers
	function accessibilityProps(index: number) {
		return {
			id: `products-tab-${index}`,
			"aria-controls": `products-tabpanel-${index}`,
		};
	}

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
		switch (newValue) {
			case 0:
				getData("HOT");
				break;
			case 1:
				getData("TRENDING");
				break;
			case 2:
				getData("SALE OFF");
				break;
			default:
				getData("HOT");
				break;
		}
	};
	return (
		<section className='mt-8 p-4'>
			<header className='font-semibold text-base mt-4 md:text-3xl text-center'>
				Our Products
			</header>

			<Box
				sx={{
					borderColor: "#0a5d5d",
					paddingBottom: "1rem",
					justifyContent: "center",
					display: "flex",
					marginTop: "1rem",
					
				}}
			>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='products tab'
					TabIndicatorProps={{
						style: { background: "#0a5d5d", bottom: "1px" },
					}}
					textColor='inherit'
				>
					<Tab
						sx={{
							color: "#6C757D",
							fontWeight: "bold",
						}}
						label='HOT'
						{...accessibilityProps(0)}
					/>
					<Tab
						sx={{
							color: "#6C757D",fontWeight: "bold",

						}}
						label='TRENDING'
						{...accessibilityProps(1)}
					/>
					<Tab
						sx={{
							color: "#6C757D",
							fontWeight: "bold",
						}}
						label='SALE OFF'
						{...accessibilityProps(2)}
					/>
				</Tabs>
			</Box>
			{/* product can be stored in a global state variable */}
			<HotProducts products={products} value={value} index={0} />
			<TrendingProducts products={products} value={value} index={1} />
			<SaleOffProducts products={products} value={value} index={2} />
			<div className='flex justify-center items-center mt-8'>
				<button
					onClick={() => getData("ALL")}
					className='border-solid text-secondary-color  border-2 border-secondary-color hover:bg-secondary-color hover:border-secondary-color hover:text-primary-color  rounded-md py-2 px-4 md:py-2.5 md:px-8  text-xs md:text-sm self-center'
				>
					View all
				</button>
			</div>
		</section>
	);
}

export default OurProducts;
