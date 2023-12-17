"use client";
import React from "react";
import Hero from "@/components/Hero";
import Discount from "@/components/Discount";
import Services from "@/components/Services";
import NewArrivals from "@/components/NewArrivals";
import OurProducts from "@/components/OurProducts";
import Discovery from "@/components/Discovery";
import Testimonials from "@/components/Testimonials";
import FlashDeals from "@/components/FlashDeals";
import News from "@/components/News";
import Deals from "@/components/Deals";
function HomePage() {
	return (
		<>
			<Hero />
			<Discount />
			<Services />
			<NewArrivals />
			<Discovery />
			<OurProducts />	
			<Testimonials />
			<FlashDeals />
			<News />
			<Deals />	
		</>
	);
}

export default HomePage;
