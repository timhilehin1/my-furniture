import React, { Suspense } from "react";
import { Metadata } from "next";
import OrdersPage from "@/screens/Orders";

export const metadata: Metadata = {
	title: "my orders",
	description: "your orders",
};

export default function Orders() {
	return (
		<Suspense fallback={null}>
			<OrdersPage />
		</Suspense>
	);
}
