import React from "react";
import Hero from "@/components/Hero";

function Home() {
	return (
		<main className='min-h-screen'>
			<div className='relative'>
				<h3>Modern Living Room</h3>
				<p>Lorem Ipsium na ham na ham</p>
				<button>Learn More</button>
				<Hero />
			</div>
		</main>
	);
}

export default Home;
