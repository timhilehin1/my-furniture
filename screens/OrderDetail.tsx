"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { MdContentCopy } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import OrderStatusBadge, { isOrderStatus } from "@/components/OrderStatusBadge";
import { countItems, formatOrderDate, shortOrderId } from "@/components/OrderCard";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useOrderFromList } from "@/hooks/api/useOrders";
import { isApiError } from "@/lib/api";
import { getNairaFormat } from "@/utils/utils";
import { PaymentStatus } from "@/interfaces/api.interface";
import { ordersHref } from "./Orders";

const PAYMENT_LABELS: Record<PaymentStatus, string> = {
	SUCCESS: "Paid",
	FAILED: "Payment failed",
	REFUND_REQUIRED: "Refund in progress",
	REFUNDED: "Refunded",
};

// full id is what support needs to look an order up
const copyOrderId = async (id: string) => {
	try {
		await navigator.clipboard.writeText(id);
		toast.success("Order ID copied");
	} catch {
		toast.error("Couldn't copy. Please copy it manually.");
	}
};

const primaryButtonClass =
	"border-none text-primary-color bg-secondary-color rounded-md py-2 px-4 md:py-2.5 text-base w-full semiLarge:w-auto mt-6";

function OrderDetailPage({ orderId }: { orderId: string }) {
	const isLoggedIn = useRequireAuth();
	const params = useSearchParams();
	const raw = params.get("status");
	const backHref = ordersHref(isOrderStatus(raw) ? raw : null);
	const order = useOrderFromList(isLoggedIn ? orderId : "");

	if (!isLoggedIn) return null;

	const message = (title: string, body: React.ReactNode, cta: React.ReactNode) => (
		<div className="flex flex-col gap-4 my-8">
			<p className="font-bold text-secondary-text-color text-2xl">{title}</p>
			<div className="text-secondary-text-color text-sm">{body}</div>
			{cta}
		</div>
	);

	let content: React.ReactNode;
	if (order.isPending) {
		content = (
			<div className="flex flex-col gap-3">
				<Skeleton height={60} />
				<Skeleton height={80} count={2} className="mb-3" />
				<Skeleton height={120} />
			</div>
		);
	} else if (order.isError) {
		content =
			isApiError(order.error) && order.error.status === 401
				? null // session expired: useRequireAuth redirects to login
				: message(
						"We couldn't load this order",
						order.error.message,
						<button onClick={() => order.refetch()} className={primaryButtonClass}>
							Retry
						</button>
					);
	} else if (!order.data) {
		content = message(
			"Order not found",
			"We couldn't find this order on your account.",
			<Link href={backHref}>
				<button className={primaryButtonClass}>Back to my orders</button>
			</Link>
		);
	} else {
		const o = order.data;
		const itemCount = countItems(o);
		content = (
			<div className="flex flex-col gap-6">
				<div className="flex justify-between items-start gap-4">
					<div className="flex flex-col gap-1">
						<p className="font-bold text-lg">Order {shortOrderId(o.id)}</p>
						<div className="flex items-center gap-2 text-xs text-secondary-text-color min-w-0">
							<span className="break-all">{o.id}</span>
							<button
								onClick={() => copyOrderId(o.id)}
								aria-label="Copy full order ID"
								title="Copy order ID"
								className="shrink-0 p-1 rounded hover:bg-[#f2f2f2] hover:text-secondary-color"
							>
								<MdContentCopy size={16} />
							</button>
						</div>
						<p className="text-xs text-secondary-text-color">
							Placed on {formatOrderDate(o.createdAt)}
						</p>
					</div>
					<OrderStatusBadge status={o.status} />
				</div>

				<div>
					<header className="border border-[#e4e6e6] bg-[#f2f2f2] p-3 text-xs font-semibold">
						{itemCount} ITEM{itemCount === 1 ? "" : "S"}
					</header>
					{o.orderItems.map((item, i) => (
						<div key={i} className="flex gap-4 p-3 border border-t-0 border-[#e4e6e6]">
							{item.imageUrl ? (
								<Image
									src={item.imageUrl}
									alt={item.productName}
									width={64}
									height={64}
									style={{ width: "4rem", height: "4rem", objectFit: "cover" }}
								/>
							) : (
								<div className="w-16 h-16 shrink-0 bg-[#f2f2f2]" />
							)}
							<div className="flex flex-col gap-1 grow min-w-0">
								<p className="text-sm font-semibold text-secondary-text-color">{item.productName}</p>
								<p className="text-xs text-secondary-text-color">Qty: {item.quantity}</p>
							</div>
							<p className="text-sm font-semibold whitespace-nowrap">
								{getNairaFormat(String(item.lineTotal))}
							</p>
						</div>
					))}
					<div className="flex justify-between items-center font-bold p-3 border border-t-0 border-[#e4e6e6] bg-[#f2f2f2]">
						<span className="text-sm">TOTAL</span>
						<span>{getNairaFormat(String(o.total))}</span>
					</div>
				</div>

				<div className="flex flex-col semiLarge:flex-row gap-4">
					<div className="border border-[#e4e6e6] p-3 flex flex-col gap-1 grow">
						<p className="text-xs font-semibold text-secondary-text-color">DELIVERY ADDRESS</p>
						<p className="text-sm">{o.shippingAddress}</p>
						<p className="text-sm">
							{o.shippingCity}, {o.shippingState}, {o.shippingCountry}
						</p>
					</div>
					{o.paymentStatus && (
						<div className="border border-[#e4e6e6] p-3 flex flex-col gap-1 grow">
							<p className="text-xs font-semibold text-secondary-text-color">PAYMENT</p>
							<p className="text-sm">{PAYMENT_LABELS[o.paymentStatus]}</p>
						</div>
					)}
				</div>
			</div>
		);
	}

	return (
		<section className="mt-6 md:mt-12 px-4 mb-16">
			<div className="max-w-2xl mx-auto">
				<Link href={backHref} className="text-sm text-secondary-text-color underline">
					← Back to my orders
				</Link>
				<div className="mt-6">{content}</div>
			</div>
		</section>
	);
}

export default OrderDetailPage;
