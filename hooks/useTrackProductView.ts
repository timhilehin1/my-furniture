"use client";
import { useEffect, useRef } from "react";
import { eventsApi } from "@/lib/api";
import { getVisitorId } from "@/lib/visitorId";

// Records one PRODUCT_VIEWED event per product page view. Fire-and-forget: tracking must never break the page.
export function useTrackProductView(productId: string | undefined) {
	const tracked = useRef<string | null>(null);

	useEffect(() => {
		// ref guard also stops the dev-mode double effect from logging twice
		if (!productId || tracked.current === productId) return;
		tracked.current = productId;
		eventsApi.productViewed(productId, getVisitorId()).catch(() => {
			// ignore everything, including 429 rate limits: no retries, nothing shown to the shopper
		});
	}, [productId]);
}
