"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);
	const isBrowser = () => typeof window !== "undefined";
	//The approach recommended by Next.js
	const scrollToTop = () => {
		if (!isBrowser()) return;
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleScroll = () => {
		// Show the button when the user scrolls down
		if (window.scrollY > 100) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		// Add scroll event listener when the component mounts
		window.addEventListener("scroll", handleScroll);

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className={`w-10 h-10 rounded-[50%]    items-center border border-secondary-color cursor-pointer flex justify-center ${isVisible ? "fixed bottom-4 right-4" : "hidden"}`}
		>
			<button
				onClick={scrollToTop}
				className='w-8 h-8 rounded-[50%] flex justify-center items-center text-primary-color bg-secondary-color border border-secondary-color text-center hover:w-10 hover:h-10'
			>
				<IoIosArrowUp size={18} />
			</button>
		</div>
	);
}

export default ScrollToTop;
