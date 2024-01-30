import React from "react";
import { ProductInterface } from "@/interfaces/product.interface";
interface Props {
	value: number;
	index: number;
	products: ProductInterface[];
}
function SaleOffProducts({ value, index , products}: Props) {
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`sales-products-tabpanel`}
			aria-labelledby={`sales-products-tab`}
		>
			{value === index && <p>Sale offProductsss</p>}
		</div>
	);
}

export default SaleOffProducts;
