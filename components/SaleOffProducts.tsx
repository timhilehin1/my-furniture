import React from "react";
interface Props {
	value: number;
	index: number;
}
function SaleOffProducts({ value, index }: Props) {
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
