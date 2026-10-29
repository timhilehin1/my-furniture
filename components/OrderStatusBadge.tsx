import React from "react";
import { OrderStatus } from "@/interfaces/api.interface";

// mirrors the backend OrderStatus enum (prisma/schema.prisma)
export const ORDER_STATUSES: OrderStatus[] = [
	"PENDING",
	"PAID",
	"PROCESSING",
	"SHIPPED",
	"DELIVERED",
	"CANCELLED",
	"EXPIRED",
	"FAILED",
	"REFUNDED",
];

export const isOrderStatus = (value: string | null): value is OrderStatus =>
	!!value && (ORDER_STATUSES as string[]).includes(value);

export const formatOrderStatus = (status: OrderStatus) =>
	status.charAt(0) + status.slice(1).toLowerCase();

// same tones the app already uses for alerts: yellow (pending), brand teal, green, red, neutral grey
const STATUS_CLASSES: Record<OrderStatus, string> = {
	PENDING: "bg-yellow-50 border-yellow-300 text-yellow-800",
	PAID: "bg-primary-color border-secondary-color text-secondary-color",
	PROCESSING: "bg-primary-color border-secondary-color text-secondary-color",
	SHIPPED: "bg-primary-color border-secondary-color text-secondary-color",
	DELIVERED: "bg-green-50 border-green-600 text-green-600",
	CANCELLED: "bg-red-50 border-red-600 text-red-600",
	EXPIRED: "bg-red-50 border-red-600 text-red-600",
	FAILED: "bg-red-50 border-red-600 text-red-600",
	REFUNDED: "bg-[#f2f2f2] border-[#e4e6e6] text-secondary-text-color",
};

function OrderStatusBadge({ status }: { status: OrderStatus }) {
	return (
		<span
			className={`inline-block border rounded px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${STATUS_CLASSES[status]}`}
		>
			{formatOrderStatus(status)}
		</span>
	);
}

export default OrderStatusBadge;
