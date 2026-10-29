"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import FormField from "@/components/FormField";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useCart } from "@/hooks/api/useCart";
import { useProfile } from "@/hooks/api/useAuth";
import {
	PendingOrder,
	pendingOrderStore,
	useCheckout,
	useResumePayment,
} from "@/hooks/api/useCheckout";
import { isApiError, toFieldErrors } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { getNairaFormat } from "@/utils/utils";
import { CheckoutPayload } from "@/interfaces/api.interface";

const DRAFT_KEY = "checkoutDraft";
const FIELDS = [
	"shippingAddress",
	"shippingCity",
	"shippingState",
	"shippingCountry",
	"shippingZipcode",
	"phone",
	"email",
];
const EMPTY_FORM: CheckoutPayload = {
	shippingAddress: "",
	shippingCity: "",
	shippingState: "",
	shippingCountry: "Nigeria",
	shippingZipcode: "",
	phone: "",
	email: "",
};

const formatTime = (iso?: string) =>
	iso ? new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

export default function CheckoutPage() {
	const isLoggedIn = useRequireAuth();
	const router = useRouter();
	const queryClient = useQueryClient();
	const cart = useCart();
	const profile = useProfile();
	const checkout = useCheckout();
	const resume = useResumePayment();

	const [form, setForm] = useState<CheckoutPayload>(EMPTY_FORM);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formError, setFormError] = useState<string | null>(null);
	const [pending, setPending] = useState<PendingOrder | null>(null);
	const [redirecting, setRedirecting] = useState(false);

	// restore the draft so an expired session or reload doesn't lose typed input
	useEffect(() => {
		try {
			const draft = sessionStorage.getItem(DRAFT_KEY);
			if (draft) setForm({ ...EMPTY_FORM, ...JSON.parse(draft) });
		} catch {
			// ignore
		}
	}, []);

	useEffect(() => {
		try {
			sessionStorage.setItem(DRAFT_KEY, JSON.stringify(form));
		} catch {
			// ignore
		}
	}, [form]);

	useEffect(() => {
		if (profile.data?.email) {
			setForm((f) => (f.email ? f : { ...f, email: profile.data.email }));
		}
	}, [profile.data?.email]);

	// nothing to pay for: send back to the cart
	useEffect(() => {
		if (!cart.data || redirecting) return;
		if (cart.data.items.length === 0 || cart.data.unavailableItems.length > 0) {
			router.replace("/cart");
		}
	}, [cart.data, redirecting, router]);

	if (!isLoggedIn) return null;

	const goToPaystack = (url: string) => {
		setRedirecting(true);
		window.location.assign(url);
	};

	const validate = () => {
		const e: Record<string, string> = {};
		if (!form.shippingAddress.trim()) e.shippingAddress = "Address is required";
		if (!form.shippingCity.trim()) e.shippingCity = "City is required";
		if (!form.shippingState.trim()) e.shippingState = "State is required";
		if (!form.shippingCountry.trim()) e.shippingCountry = "Country is required";
		if (!/^\+?[\d\s-]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone number";
		if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
		return e;
	};

	const handlePay = (e: React.FormEvent) => {
		e.preventDefault();
		if (checkout.isPending || redirecting) return; // double-click guard
		const clientErrors = validate();
		setErrors(clientErrors);
		setFormError(null);
		if (Object.keys(clientErrors).length) return;

		const payload = { ...form };
		if (!payload.shippingZipcode) delete payload.shippingZipcode;

		checkout.mutate(payload, {
			onSuccess: (url) => {
				sessionStorage.removeItem(DRAFT_KEY);
				goToPaystack(url);
			},
			onError: (err) => {
				if (!isApiError(err) || err.status === 401) return; // 401 handled globally
				if (err.status === 409 && typeof err.data.orderId === "string") {
					setPending({
						orderId: err.data.orderId,
						expiresAt: err.data.expiresAt as string | undefined,
					});
					return;
				}
				if (err.status === 400 && /out of stock|unavailable|no items/i.test(err.message)) {
					toast.error(err.message);
					queryClient.invalidateQueries({ queryKey: queryKeys.cart });
					router.push("/cart");
					return;
				}
				if (err.status === 400 && /not pending/i.test(err.message)) {
					pendingOrderStore.clear();
					setFormError("Your order expired before payment started. Please try again.");
					return;
				}
				const { fieldErrors, formError } = toFieldErrors(err, FIELDS);
				setErrors(fieldErrors);
				setFormError(formError);
			},
		});
	};

	const handleResume = () => {
		if (!pending || resume.isPending) return;
		resume.mutate(pending, {
			onSuccess: goToPaystack,
			onError: (err) => {
				if (isApiError(err) && err.status === 401) return;
				// backend can't re-initiate the same order yet (duplicate Paystack reference)
				setFormError(
					`We couldn't reopen that payment. Please try again after ${formatTime(pending.expiresAt)}.`
				);
			},
		});
	};

	const update = (e: React.ChangeEvent<HTMLInputElement>) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const busy = checkout.isPending || redirecting;

	return (
		<section className="mt-6 md:mt-12 mb-16 px-4 lg:px-8 max-w-screen-xl mx-auto">
			<h1 className="md:text-3xl text-2xl font-black mb-8">CHECKOUT</h1>

			{cart.isPending ? (
				<p className="text-sm text-secondary-text-color">Loading your cart…</p>
			) : cart.isError ? (
				<div className="flex flex-col gap-3 items-start">
					<p className="text-sm text-red-600">{cart.error.message}</p>
					<button onClick={() => cart.refetch()} className="text-sm font-semibold underline">
						Retry
					</button>
				</div>
			) : (
				<div className="flex flex-col lg:flex-row gap-8">
					<form onSubmit={handlePay} noValidate className="lg:w-8/12 flex flex-col gap-4">
						{formError && (
							<p role="alert" className="text-sm text-red-600 bg-red-50 p-2.5 rounded">
								{formError}
							</p>
						)}
						{pending && (
							<div role="alert" className="text-sm bg-yellow-50 border border-yellow-300 p-3 rounded flex flex-col gap-2">
								<p>
									You have an unfinished payment
									{pending.expiresAt ? ` (expires at ${formatTime(pending.expiresAt)})` : ""}.
								</p>
								<button type="button" onClick={handleResume} disabled={resume.isPending}
									className="self-start text-sm font-semibold text-white bg-secondary-color px-4 py-2 rounded disabled:opacity-60">
									{resume.isPending ? "Opening…" : "Resume payment"}
								</button>
							</div>
						)}
						<FormField label="Address" name="shippingAddress" autoComplete="street-address"
							value={form.shippingAddress} onChange={update} error={errors.shippingAddress} />
						<div className="flex flex-col md:flex-row gap-4">
							<FormField label="City" name="shippingCity" autoComplete="address-level2"
								value={form.shippingCity} onChange={update} error={errors.shippingCity} />
							<FormField label="State" name="shippingState" autoComplete="address-level1"
								value={form.shippingState} onChange={update} error={errors.shippingState} />
						</div>
						<div className="flex flex-col md:flex-row gap-4">
							<FormField label="Country" name="shippingCountry" autoComplete="country-name"
								value={form.shippingCountry} onChange={update} error={errors.shippingCountry} />
							<FormField label="Zip code (optional)" name="shippingZipcode" autoComplete="postal-code"
								value={form.shippingZipcode ?? ""} onChange={update} error={errors.shippingZipcode} />
						</div>
						<div className="flex flex-col md:flex-row gap-4">
							<FormField label="Phone" name="phone" type="tel" autoComplete="tel"
								value={form.phone} onChange={update} error={errors.phone} />
							<FormField label="Email (for your receipt)" name="email" type="email" autoComplete="email"
								value={form.email} onChange={update} error={errors.email} />
						</div>
						<button type="submit" disabled={busy}
							className="text-sm font-semibold text-white bg-secondary-color p-2.5 rounded disabled:opacity-60 mt-2">
							{redirecting ? "Redirecting to Paystack…" : checkout.isPending ? "Processing…" : `Pay ${getNairaFormat(String(cart.data.subTotal))}`}
						</button>
						<Link href="/cart" className="text-sm text-secondary-text-color underline">
							Back to cart
						</Link>
					</form>

					<aside className="lg:w-4/12 border border-[#e4e6e6] bg-[#f2f2f2] p-4 flex flex-col gap-3 h-fit">
						<p className="text-xs font-semibold text-secondary-text-color">ORDER SUMMARY</p>
						{cart.data.items.map((item) => (
							<div key={item.id} className="flex justify-between text-sm gap-4">
								<span>{item.productName} × {item.quantity}</span>
								<span className="font-semibold">{getNairaFormat(String(item.lineTotal))}</span>
							</div>
						))}
						<hr />
						<div className="flex justify-between font-bold">
							<span>TOTAL</span>
							<span>{getNairaFormat(String(cart.data.subTotal))}</span>
						</div>
					</aside>
				</div>
			)}
		</section>
	);
}
