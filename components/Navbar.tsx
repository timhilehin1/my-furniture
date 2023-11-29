import React from "react";
import { IoMenu, IoSearch } from "react-icons/io5";
import { MdOutlineChair } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { IoIosStarOutline } from "react-icons/io";  

const Navbar = () => {
	return (
		<nav className='max-w-screen-xl mx-auto py-4 px-2 bg-primary-color flex justify-between items-center text-base'>
			{/* //mobile */}
			<div className='flex items-center gap-3 md:hidden'>
				<IoMenu size={24} />
				<IoSearch size={24} />
			</div>

			{/* //desktop */}
			<div className='hidden md:flex items-center gap-3'>
				<MdOutlineChair size={24} />
				<p>MyFurniture</p>
			</div>

			{/* mobile */}
			<div className='flex items-center gap-3 md:hidden'>
				<MdOutlineChair size={24} />
				<p>MyFurniture</p>
			</div>

			{/* desktop */}
			<div className='items-center gap-16 hidden md:flex'>
				<p>Home</p>
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
        <IoIosStarOutline size={24} />
        <AiOutlineShoppingCart size={24} />
			</div>
		</nav>
	);
};

export default Navbar;
