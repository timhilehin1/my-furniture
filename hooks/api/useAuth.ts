"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { pendingOrderStore } from "./useCheckout";
import { authApi } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout, setTokens } from "@/lib/slices/authSlice";
import { AuthResponse } from "@/interfaces/api.interface";

export const useIsLoggedIn = () =>
	useAppSelector((state) => !!state.auth.accessToken);

export function useProfile() {
	const isLoggedIn = useIsLoggedIn();
	return useQuery({
		queryKey: queryKeys.profile,
		queryFn: authApi.profile,
		enabled: isLoggedIn,
		staleTime: 5 * 60_000,
	});
}

function useOnAuthSuccess() {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	return ({ accessToken, refreshToken, ...user }: AuthResponse) => {
		dispatch(setTokens({ accessToken, refreshToken }));
		queryClient.setQueryData(queryKeys.profile, user);
		queryClient.invalidateQueries({ queryKey: queryKeys.cart });
	};
}

export function useLogin() {
	const onSuccess = useOnAuthSuccess();
	return useMutation({ mutationFn: authApi.login, onSuccess });
}

export function useRegister() {
	const onSuccess = useOnAuthSuccess();
	return useMutation({ mutationFn: authApi.register, onSuccess });
}

// Set during a deliberate logout so protected pages don't race the redirect home with a /login redirect.
// useRequireAuth resets it whenever a protected page mounts.
let loggingOut = false;
export const isLoggingOut = () => loggingOut;
export const resetLoggingOut = () => {
	loggingOut = false;
};

// No backend logout endpoint: clearing tokens and cached server state is enough
export function useLogout() {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const router = useRouter();
	return () => {
		loggingOut = true;
		pendingOrderStore.clear();
		dispatch(logout());
		queryClient.clear();
		router.replace("/");
	};
}
