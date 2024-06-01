import type { Metadata } from "next";
import "./global.css";
import React from "react";
import StoreProvider from "@/lib/StoreProvider";
import Navbar from "@/components/Navbar";
import { Jost } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { AppProvider } from "@/theme";
import ScrollToTop from "@/components/ScrollToTop";
import { UserProvider } from "@auth0/nextjs-auth0/client";
const JostFont = Jost({ subsets: ["latin"] });

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
		<html className={JostFont.className} lang="en">
			<head>
				<link rel="shortcut icon" href="/favicon.ico" />
			</head>
			<body>
				<AppProvider>
					<StoreProvider>
						<UserProvider>
							<Navbar />
							<Sidebar />
							{children}
							<BottomNav />
							<ScrollToTop />
							<Footer />
						</UserProvider>
					</StoreProvider>
				</AppProvider>
			</body>
		</html>
	);
}
