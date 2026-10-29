"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import OrderCard from "@/components/OrderCard";
import {
	ORDER_STATUSES,
	formatOrderStatus,
	isOrderStatus,
} from "@/components/OrderStatusBadge";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useOrders } from "@/hooks/api/useOrders";
import { isApiError } from "@/lib/api";
import { OrderStatus } from "@/interfaces/api.interface";

const primaryButtonClass =
	"border-none text-primary-color bg-secondary-color rounded-md py-2 px-4 md:py-2.5 text-base w-full semiLarge:w-auto mt-6";

export const ordersHref = (status: OrderStatus | null) =>
	status ? `/orders?status=${status}` : "/orders";

function OrdersPage() {
	const isLoggedIn = useRequireAuth();
	const router = useRouter();
	const params = useSearchParams();
	const raw = params.get("status");
	const status = isOrderStatus(raw) ? raw : null;
	const orders = useOrders(status, isLoggedIn);

	if (!isLoggedIn) return null;

	const selectStatus = (next: OrderStatus | null) => {
		if (next === status) return;
		router.push(ordersHref(next), { scroll: false });
	};

	const chips: { label: string; value: OrderStatus | null }[] = [
		{ label: "All", value: null },
		...ORDER_STATUSES.map((s) => ({ label: formatOrderStatus(s), value: s })),
	];

	const emptyState = (title: string, body: React.ReactNode, cta?: React.ReactNode) => (
		<div className="flex flex-col gap-4 my-8">
			<p className="font-bold text-secondary-text-color text-2xl">{title}</p>
			<div className="text-secondary-text-color text-sm">{body}</div>
			{cta}
		</div>
	);

	const items = orders.data?.pages.flatMap((p) => p.data) ?? [];

	let content: React.ReactNode;
	if (orders.isPending) {
		content = (
			<div className="flex flex-col gap-3">
				<Skeleton height={96} count={4} className="mb-3" />
			</div>
		);
	} else if (orders.isError) {
		content =
			isApiError(orders.error) && orders.error.status === 401
				? null // session expired: useRequireAuth redirects to login
				: emptyState(
						"We couldn't load your orders",
						orders.error.message,
						<button onClick={() => orders.refetch()} className={primaryButtonClass}>
							Retry
						</button>
					);
	} else if (items.length === 0) {
		content = status
			? emptyState(
					`No ${formatOrderStatus(status).toLowerCase()} orders`,
					"You don't have any orders with this status.",
					<button onClick={() => selectStatus(null)} className="self-start text-sm font-semibold underline">
						View all orders
					</button>
				)
			: emptyState(
					"You haven't placed any orders yet",
					"When you place an order, it will show up here.",
					<Link href="/">
						<button className={primaryButtonClass}>Start Shopping</button>
					</Link>
				);
	} else {
		content = (
			<div className="flex flex-col gap-3">
				{items.map((order) => (
					<OrderCard
						key={order.id}
						order={order}
						href={`/orders/${order.id}${status ? `?status=${status}` : ""}`}
					/>
				))}
				{orders.isFetchNextPageError && (
					<p className="text-sm text-red-600">
						Couldn&apos;t load more orders. Please try again.
					</p>
				)}
				{orders.hasNextPage && (
					<button
						onClick={() => orders.fetchNextPage()}
						disabled={orders.isFetchingNextPage}
						className="w-full mt-4 text-sm font-semibold border-2 border-secondary-color text-secondary-color bg-primary-color p-2.5 rounded hover:bg-secondary-color hover:text-primary-color disabled:opacity-50"
					>
						{orders.isFetchingNextPage ? "Loading…" : "Load more"}
					</button>
				)}
			</div>
		);
	}

	return (
		<section className="mt-2 md:mt-16 px-4 mb-16">
			<div className="pb-10 flex flex-col gap-1 items-center">
				<h1 className="md:text-3xl text-2xl font-black">MY ORDERS</h1>
				<div className="flex gap-1 items-center text-xs font-semibold">
					<div className="flex gap-2 items-center">
						<IoHomeOutline size={12} />
						<Link href="/">
							<p>Home</p>
						</Link>
					</div>
					<p className="font-black">.</p>
					<div>My Orders</div>
				</div>
			</div>

			<div className="max-w-2xl mx-auto">
				<div
					role="tablist"
					aria-label="Filter orders by status"
					className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4 semiLarge:mx-0 semiLarge:px-0"
				>
					{chips.map((chip) => {
						const active = chip.value === status;
						return (
							<button
								key={chip.label}
								role="tab"
								aria-selected={active}
								onClick={() => selectStatus(chip.value)}
								className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded border ${
									active
										? "bg-secondary-color border-secondary-color text-primary-color"
										: "bg-primary-color border-[#e4e6e6] hover:bg-[#f2f2f2]"
								}`}
							>
								{chip.label}
							</button>
						);
					})}
				</div>
				{content}
			</div>
		</section>
	);
}

export default OrdersPage;
