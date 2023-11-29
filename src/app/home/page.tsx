import React from "react";
import { Metadata } from "next";
import Home from "@/pages/Home";

export const metadata: Metadata = {
	title: "home",
	description: "Welcome to my furniture store",
};

export default function HomePage() {
	return <Home />;
}
