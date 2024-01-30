
import React, {useEffect} from "react";
import { ProductInterface } from "@/interfaces/product.interface";
interface Props {
	value: number;
	index: number;
	products: ProductInterface[];
}

function TrendingProducts({ value, index, products }: Props) {
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
