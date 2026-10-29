"use client";
import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import FormField from "@/components/FormField";
import { useRegister } from "@/hooks/api/useAuth";
import { toFieldErrors } from "@/lib/api";
import { safeNext } from "@/hooks/useRequireAuth";

const FIELDS = ["firstName", "lastName", "email", "password"];

function RegisterForm() {
	const router = useRouter();
	const next = safeNext(useSearchParams().get("next"));
	const register = useRegister();
	const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formError, setFormError] = useState<string | null>(null);

	const validate = () => {
		const e: Record<string, string> = {};
		if (!form.firstName.trim()) e.firstName = "First name is required";
		if (!form.lastName.trim()) e.lastName = "Last name is required";
		if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
		if (form.password.length < 8) e.password = "Password must be at least 8 characters";
		return e;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (register.isPending) return;
		const clientErrors = validate();
		setErrors(clientErrors);
		setFormError(null);
		if (Object.keys(clientErrors).length) return;
		register.mutate(form, {
			// register returns tokens, so the user is logged in straight away
			onSuccess: () => router.replace(next),
			onError: (err) => {
				const { fieldErrors, formError } = toFieldErrors(err, FIELDS);
				setErrors(fieldErrors);
				setFormError(formError);
				toast.error(formError ?? Object.values(fieldErrors)[0]);
			},
		});
	};

	const update = (e: React.ChangeEvent<HTMLInputElement>) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	return (
		<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
			{formError && (
				<p role="alert" className="text-sm text-red-600 bg-red-50 p-2.5 rounded">
					{formError}
				</p>
			)}
			<div className="flex gap-4">
				<FormField label="First name" name="firstName" autoComplete="given-name"
					value={form.firstName} onChange={update} error={errors.firstName} />
				<FormField label="Last name" name="lastName" autoComplete="family-name"
					value={form.lastName} onChange={update} error={errors.lastName} />
			</div>
			<FormField label="Email" name="email" type="email" autoComplete="email"
				value={form.email} onChange={update} error={errors.email} />
			<FormField label="Password" name="password" type="password" autoComplete="new-password"
				value={form.password} onChange={update} error={errors.password} />
			<button type="submit" disabled={register.isPending}
				className="text-sm font-semibold text-white bg-secondary-color p-2.5 rounded disabled:opacity-60">
				{register.isPending ? "Creating account…" : "Create account"}
			</button>
			<p className="text-sm text-secondary-text-color">
				Already have an account?{" "}
				<Link className="text-secondary-color font-semibold"
					href={`/login?next=${encodeURIComponent(next)}`}>
					Login
				</Link>
			</p>
		</form>
	);
}

export default function RegisterPage() {
	return (
		<section className="max-w-md mx-auto mt-10 mb-16 px-4">
			<h1 className="text-2xl font-black mb-6">CREATE ACCOUNT</h1>
			<Suspense fallback={null}>
				<RegisterForm />
			</Suspense>
		</section>
	);
}
