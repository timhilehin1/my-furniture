"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isLoggingOut, resetLoggingOut, useIsLoggedIn } from "./api/useAuth";

// Client-side guard: tokens live in localStorage, so middleware can't see them
export function useRequireAuth() {
	const isLoggedIn = useIsLoggedIn();
	const router = useRouter();
	const pathname = usePathname();

	// a freshly mounted protected page means any earlier logout redirect has finished
	useEffect(() => {
		resetLoggingOut();
	}, []);

	useEffect(() => {
		// deliberate logout: useLogout is already sending the user home
		if (!isLoggedIn && !isLoggingOut()) {
			const next = pathname + window.location.search;
			router.replace(`/login?next=${encodeURIComponent(next)}`);
		}
	}, [isLoggedIn, pathname, router]);

	return isLoggedIn;
}

// Only allow internal redirect targets
export function safeNext(next: string | null, fallback = "/") {
	return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}
