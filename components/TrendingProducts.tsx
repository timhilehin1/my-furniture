import React from "react";
interface Props {
	value: number;
	index: number;
}

function TrendingProducts({ value, index }: Props) {
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`trending-products-tabpanel`}
			aria-labelledby={`trending-products-tab`}
		>
			{value === index && <p>TrendingProductsss</p>}
		</div>
	);
}

export default TrendingProducts;
