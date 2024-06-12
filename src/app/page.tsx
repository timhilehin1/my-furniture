import React from "react";
import { Metadata } from "next";
import HomePage from "@/screens/Home";


export const metadata: Metadata = {
	title: "home",
	description: "Welcome to my furniture store",
};
export default function Home() {
	return <HomePage />;
}
