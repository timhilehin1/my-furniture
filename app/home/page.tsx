import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "home",
	description: "Welcome to my furniture store",
};

export default function HomePage() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<p>Hi, this is the start of something ssssssssssss</p>
            <p>must be nice</p>
		</main>
	);
}
