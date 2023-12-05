import type { Metadata } from "next";
import "./global.css";
import React from "react";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
	title: "A timi brand production",
	description: "Future of Interior Design",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
