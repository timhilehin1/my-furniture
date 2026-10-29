import React from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
	error?: string;
}

function FormField({ label, name, error, ...inputProps }: FormFieldProps) {
	return (
		<label className="flex flex-col gap-1 text-sm font-semibold">
			{label}
			<input
				name={name}
				aria-invalid={!!error}
				className={`border p-2.5 rounded text-sm font-normal focus:outline-none focus:border-secondary-color ${
					error ? "border-red-500" : "border-[#e4e6e6]"
				}`}
				{...inputProps}
			/>
			{error && <span className="text-xs font-medium text-red-600">{error}</span>}
		</label>
	);
}

export default FormField;
