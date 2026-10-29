"use client";
import React, { useState } from "react";
import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { isApiError } from "./api";
import { store } from "./store";
import { logout } from "./slices/authSlice";

const SESSION_TOAST_ID = "session-expired";

export default function QueryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [queryClient] = useState(() => {
		// The only place session expiry is handled: a 401 on a request that carried a token,
		// after apiFetch already tried refreshing it.
		const handleError = (error: unknown) => {
			if (!isApiError(error) || error.status !== 401 || !error.authed) return;
			store.dispatch(logout());
			client.clear();
			toast.error("Your session expired, please log in again", {
				toastId: SESSION_TOAST_ID,
			});
			const { pathname, search } = window.location;
			if (!pathname.startsWith("/login")) {
				window.location.assign(
					`/login?next=${encodeURIComponent(pathname + search)}`
				);
			}
		};

		const client: QueryClient = new QueryClient({
			queryCache: new QueryCache({ onError: handleError }),
			mutationCache: new MutationCache({ onError: handleError }),
			defaultOptions: {
				queries: {
					staleTime: 30_000,
					refetchOnWindowFocus: true,
					// only retry network failures, never 4xx/5xx responses
					retry: (failureCount, error) =>
						isApiError(error) && error.status === 0 && failureCount < 2,
				},
				mutations: { retry: 0 },
			},
		});
		return client;
	});

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
