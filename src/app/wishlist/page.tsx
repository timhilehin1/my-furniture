import React from "react";
import { Metadata } from "next";
import WishlistPage from "@/screens/Wishlist";

export const metadata: Metadata = {
	title: "wishlist",
	description: "Wishlist page",
};

export default function Wishlist() {
	return <WishlistPage />;
}
