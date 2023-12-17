import React, { useState } from "react";
import TrendingProducts from "./TrendingProducts";
import SaleOffProducts from "./SaleOffProducts";
import HotProducts from "./HotProducts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
function OurProducts() {
	const [value, setValue] = useState(0);
	//accessibility prop for screen readers
	function accessibilityProps(index: number) {
		return {
			id: `products-tab-${index}`,
			"aria-controls": `products-tabpanel-${index}`,
		};
	}

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
		console.log(newValue);
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
							fontFamily: "Jost",
						}}
						label='HOT'
						{...accessibilityProps(0)}
					/>
					<Tab
						sx={{
							color: "#6C757D",
							fontFamily: "Jost",
						}}
						label='TRENDING'
						{...accessibilityProps(1)}
					/>
					<Tab
						sx={{
							color: "#6C757D",
							fontFamily: "Jost",
						}}
						label='SALE OFF'
						{...accessibilityProps(2)}
					/>
				</Tabs>
			</Box>
			<HotProducts value={value} index={0} />
			<TrendingProducts value={value} index={1} />
			<SaleOffProducts value={value} index={2} />
			<div className='flex justify-center items-center mt-8'>
				<button className='border-solid text-secondary-color  border-2 border-secondary-color hover:bg-secondary-color hover:border-secondary-color hover:text-primary-color  rounded-md py-2 px-4 md:py-2.5 md:px-8  text-xs md:text-sm self-center'>
					View all
				</button>
			</div>
		</section>
	);
}

export default OurProducts;
