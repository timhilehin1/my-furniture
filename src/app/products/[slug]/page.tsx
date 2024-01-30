import React from "react";
import { Metadata } from "next";
import ProductDetailsPage from "@/components/ProductDetails";

export const metadata: Metadata = {
	title: "product details",
	description: "Product details",
};


export default function ProductDetails({ params }: { params: { slug: string } }) {
return <ProductDetailsPage slug={params.slug}/>;
}