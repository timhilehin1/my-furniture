import React, { Suspense } from "react";
import { Metadata } from "next";
import OrderDetailPage from "@/screens/OrderDetail";

export const metadata: Metadata = {
	title: "order details",
	description: "order details",
};

export default function OrderDetail({ params }: { params: { id: string } }) {
	return (
		<Suspense fallback={null}>
			<OrderDetailPage orderId={params.id} />
		</Suspense>
	);
}
