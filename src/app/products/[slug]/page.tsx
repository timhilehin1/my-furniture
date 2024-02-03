import React from "react";
import { Metadata } from "next";
import ProductDetailsPage from "@/components/ProductDetails";
import { fetchProducts } from "@/sanity/sanity.query";
import { ProductInterface } from "@/interfaces/product.interface";

export const metadata: Metadata = {
	title: "product details",
	description: "Product details",
};

export async function generateStaticParams() {
	const data = await fetchProducts();
	return data.map((product: ProductInterface) => ({
		slug: product.slug,
	}));
}

export default function ProductDetails({
	params,
}: {
	params: { slug: string };
}) {
	return <ProductDetailsPage slug={params.slug} />;
}
