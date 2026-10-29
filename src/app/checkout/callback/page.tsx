"use client";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import {
	pendingOrderStore,
	useOrderStatus,
	useResumePayment,
} from "@/hooks/api/useCheckout";

const FAILED_STATUSES = ["EXPIRED", "FAILED", "CANCELLED", "REFUNDED"];

function CallbackContent() {
	const params = useSearchParams();
	const [startedAt, setStartedAt] = useState(() => Date.now());
	const [orderId, setOrderId] = useState<string | null>(params.get("reference"));
	const resume = useResumePayment();

	// fall back to the order stored before redirecting (e.g. user came back without the query param)
	useEffect(() => {
		if (!orderId) setOrderId(pendingOrderStore.get()?.orderId ?? null);
	}, [orderId]);

	const status = useOrderStatus(orderId, startedAt);
	const data = status.data;

	useEffect(() => {
		if (data?.isFinal) pendingOrderStore.clear();
	}, [data?.isFinal]);

	const checkAgain = () => {
		setStartedAt(Date.now()); // restart the polling window
		status.refetch();
	};

	if (!orderId) {
		return (
			<State title="We couldn't find your order">
				<Link className="underline" href="/cart">Back to cart</Link>
			</State>
		);
	}

	if (status.isPending) {
		return <State title="Confirming your payment…" spinner />;
	}

	if (status.isError) {
		return (
			<State title="We couldn't check your payment" body={status.error.message}>
				<button onClick={checkAgain} className="underline font-semibold">Try again</button>
			</State>
		);
	}

	if (data?.status === "PAID" || (data?.isFinal && !FAILED_STATUSES.includes(data.status))) {
		return (
			<State title="Payment successful 🎉" body={data.message}>
				<Link href="/" className="text-white bg-secondary-color px-4 py-2 rounded">
					Continue shopping
				</Link>
			</State>
		);
	}

	if (data?.isFinal) {
		return (
			<State title="Payment not completed" body={data.message}>
				<Link href="/cart" className="text-white bg-secondary-color px-4 py-2 rounded">
					Back to cart
				</Link>
			</State>
		);
	}

	// still PENDING: either the webhook hasn't arrived or the user cancelled on Paystack
	const polling = status.isFetching || Date.now() - startedAt < 30_000;
	const cached = pendingOrderStore.get();
	return (
		<State
			title={polling ? "Confirming your payment…" : "Still waiting for confirmation"}
			body={
				polling
					? data?.message
					: "We haven't heard back from Paystack yet. If you paid, this will update shortly — you won't be charged twice. If you cancelled, you can resume the payment."
			}
			spinner={polling}
		>
			{!polling && (
				<div className="flex gap-4 items-center">
					<button onClick={checkAgain} className="underline font-semibold">Check again</button>
					{cached?.orderId === orderId && cached.authorizationUrl && (
						<button
							onClick={() =>
								resume.mutate(cached, { onSuccess: (url) => window.location.assign(url) })
							}
							className="text-white bg-secondary-color px-4 py-2 rounded"
						>
							Resume payment
						</button>
					)}
				</div>
			)}
		</State>
	);
}

function State({
	title,
	body,
	spinner,
	children,
}: {
	title: string;
	body?: string;
	spinner?: boolean;
	children?: React.ReactNode;
}) {
	return (
		<div className="flex flex-col items-center text-center gap-4 py-16" aria-live="polite">
			{spinner && (
				<div className="h-8 w-8 rounded-full border-4 border-secondary-color border-t-transparent animate-spin" />
			)}
			<h1 className="text-2xl font-black">{title}</h1>
			{body && <p className="text-sm text-secondary-text-color max-w-md">{body}</p>}
			{children}
		</div>
	);
}

export default function CheckoutCallbackPage() {
	const isLoggedIn = useRequireAuth();
	return (
		<section className="px-4 mb-16">
			{isLoggedIn && (
				<Suspense fallback={null}>
					<CallbackContent />
				</Suspense>
			)}
		</section>
	);
}
