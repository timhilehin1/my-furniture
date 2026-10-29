import React from "react";
import Link from "next/link";
import Image from "next/image";
import { convertDateToText, getNairaFormat } from "@/utils/utils";
import { OrderListItem } from "@/interfaces/api.interface";
import OrderStatusBadge from "./OrderStatusBadge";

// order ids are cuids; the tail is enough for a customer to recognise one
export const shortOrderId = (id: string) => `#${id.slice(-8).toUpperCase()}`;

export const formatOrderDate = (iso: string) => convertDateToText(iso.slice(0, 10));

export const countItems = (order: OrderListItem) =>
	order.orderItems.reduce((sum, item) => sum + item.quantity, 0);

function OrderCard({ order, href }: { order: OrderListItem; href: string }) {
	const first = order.orderItems[0];
	const itemCount = countItems(order);
	const others = order.orderItems.length - 1;

	return (
		<Link
			href={href}
			className="flex gap-4 p-3 border border-[#e4e6e6] hover:bg-[#f2f2f2] transition-colors"
		>
			{first?.imageUrl ? (
				<Image
					src={first.imageUrl}
					alt={first.productName}
					width={64}
					height={64}
					style={{ width: "4rem", height: "4rem", objectFit: "cover" }}
				/>
			) : (
				<div className="w-16 h-16 shrink-0 bg-[#f2f2f2]" />
			)}
			<div className="flex flex-col gap-1 min-w-0 grow">
				<div className="flex justify-between items-start gap-2">
					<p className="font-bold text-sm">{shortOrderId(order.id)}</p>
					<OrderStatusBadge status={order.status} />
				</div>
				<p className="text-xs text-secondary-text-color">{formatOrderDate(order.createdAt)}</p>
				{first && (
					<p className="text-sm font-semibold text-secondary-text-color truncate">
						{first.productName}
						{others > 0 ? ` + ${others} more` : ""}
					</p>
				)}
				<div className="flex justify-between items-center text-sm">
					<span className="text-secondary-text-color text-xs">
						{itemCount} item{itemCount === 1 ? "" : "s"}
					</span>
					<span className="font-bold">{getNairaFormat(String(order.total))}</span>
				</div>
			</div>
		</Link>
	);
}

export default OrderCard;
