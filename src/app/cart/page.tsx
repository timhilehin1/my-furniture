import React from "react";
import { Metadata } from "next";
import CartPage from "@/screens/Cart";

export const metadata: Metadata = {
	title: "carts",
	description: "carts",
};

export default function Cart() {
	return <CartPage />;
}
