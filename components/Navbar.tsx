"use client";
import React from "react";
import { IoMenu, IoSearch } from "react-icons/io5";
import { MdOutlineChair } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { IoIosStarOutline } from "react-icons/io";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

const Navbar = () => {
	const wishlist = useAppSelector((state) => state.wishlist);
	return (
		<>
			<nav className='max-w-screen-xl mx-auto py-4 px-2 bg-primary-color flex justify-between items-center text-base'>
				{/* //mobile */}
				<div className='flex items-center gap-3 md:hidden'>
					<IoMenu size={24} />
					<IoSearch size={24} />
				</div>

				{/* //desktop */}
				<div className='hidden md:flex items-center gap-3 cursor-pointer'>
					<MdOutlineChair size={24} />
					<p>MyFurniture</p>
				</div>

				{/* mobile */}
				<div className='flex items-center gap-3 md:hidden'>
					<MdOutlineChair size={24} />
					<p>MyFurniture</p>
				</div>

				{/* desktop */}
				<div className='items-center gap-16 hidden md:flex cursor-pointer'>
					<Link href='/'>
						<p>Home</p>
					</Link>
					<p>Collection</p>
					<p>Products</p>
					<p>Other Pages</p>
					<p>Blog</p>
				</div>

				{/* mobile */}
				<div className='md:hidden'>
					<AiOutlineShoppingCart size={24} />
				</div>

				{/* desktop */}
				<div className='hidden md:flex items-center gap-8'>
					<IoSearch size={24} />
					<FaRegUser size={24} />
					<Link href='/wishlist'>
						<div className="relative">
							<p className='bg-secondary-color text-xs text-primary-color  semiLarge:flex h-4 w-4 rounded-[50%]  justify-center items-center absolute -top-1 -right-2'>
								{wishlist.length}
							</p>
							<IoIosStarOutline size={24} />
						</div>
					</Link>
					<AiOutlineShoppingCart size={24} />
				</div>
			</nav>
			<hr className='border-[secondary-text-color] mx-4' />
		</>
	);
};

export default Navbar;
