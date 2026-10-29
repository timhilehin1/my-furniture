"use client";
import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import FormField from "@/components/FormField";
import { useLogin } from "@/hooks/api/useAuth";
import { toFieldErrors } from "@/lib/api";
import { safeNext } from "@/hooks/useRequireAuth";

const FIELDS = ["email", "password"];

function LoginForm() {
	const router = useRouter();
	const next = safeNext(useSearchParams().get("next"));
	const login = useLogin();
	const [form, setForm] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [formError, setFormError] = useState<string | null>(null);

	const validate = () => {
		const e: Record<string, string> = {};
		if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
		if (form.password.length < 8) e.password = "Password must be at least 8 characters";
		return e;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (login.isPending) return;
		const clientErrors = validate();
		setErrors(clientErrors);
		setFormError(null);
		if (Object.keys(clientErrors).length) return;
		login.mutate(form, {
			onSuccess: () => router.replace(next),
			onError: (err) => {
				// wrong credentials come back as 400 "Email or password incorrect"
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
			<FormField label="Email" name="email" type="email" autoComplete="email"
				value={form.email} onChange={update} error={errors.email} />
			<FormField label="Password" name="password" type="password" autoComplete="current-password"
				value={form.password} onChange={update} error={errors.password} />
			<button type="submit" disabled={login.isPending}
				className="text-sm font-semibold text-white bg-secondary-color p-2.5 rounded disabled:opacity-60">
				{login.isPending ? "Logging in…" : "Login"}
			</button>
			<p className="text-sm text-secondary-text-color">
				New here?{" "}
				<Link className="text-secondary-color font-semibold"
					href={`/register?next=${encodeURIComponent(next)}`}>
					Create an account
				</Link>
			</p>
		</form>
	);
}

export default function LoginPage() {
	return (
		<section className="max-w-md mx-auto mt-10 mb-16 px-4">
			<h1 className="text-2xl font-black mb-6">LOGIN</h1>
			<Suspense fallback={null}>
				<LoginForm />
			</Suspense>
		</section>
	);
}
