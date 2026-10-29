"use client";
import React, { useState } from "react";
import { IoMenu, IoSearch } from "react-icons/io5";
import { MdOutlineChair } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { IoIosStarOutline } from "react-icons/io";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleSidebar } from "@/lib/slices/sidebarSlice";
import { usePathname } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { useProfile } from "@/hooks/api/useAuth";
import { useCartCount } from "@/hooks/api/useCart";
import ProfileTab from "./ProfileTab";
const Navbar = () => {
	const [showProfle, setShowProfile] = useState<boolean>(false);
	const { data: user } = useProfile();
	const wishlist = useAppSelector((state) => state.wishlist);
	const cartCount = useCartCount();
	const sidebar = useAppSelector((state) => state.sidebar);
	const dispatch = useAppDispatch();
	const pathname = usePathname();

	return (
		<>
			<nav className="max-w-screen-xl  mx-auto py-4 px-4 lg:px-2 bg-primary-color flex justify-between items-center text-base">
				{/* //mobile */}
				<div className="flex items-center gap-3 _lg:hidden">
					{sidebar.SidebarStatus ? (
						<AiOutlineClose
							className="cursor-pointer"
							onClick={() => dispatch(toggleSidebar())}
							size={24}
						/>
					) : (
						<IoMenu
							className="cursor-pointer"
							onClick={() => dispatch(toggleSidebar())}
							size={24}
						/>
					)}
					{/* hide searchbar on tabs and screen sizes above tabs */}
					<IoSearch className="block semiLarge:hidden" size={20} />
					<div className="hidden items-center gap-3 semiLarge:flex _lg:hidden">
						<MdOutlineChair size={24} />
						<p>MyFurniture</p>
					</div>
				</div>

				{/* //desktop */}
				<div className="hidden _lg:flex items-center gap-3 cursor-pointer">
					<MdOutlineChair size={24} />
					<p>MyFurniture</p>
				</div>

				{/* <ScrollToTop /> */}

				{/* mobile */}
				<div className="flex items-center gap-3 semiLarge:hidden">
					<MdOutlineChair size={24} />
					<p>MyFurniture</p>
				</div>

				{/* desktop */}
				<div className="items-center gap-16 hidden _lg:flex cursor-pointer">
					<Link
						className={` hover:text-secondary-color${
							pathname === "/"
								? " border-b-2 border-secondary-color text-secondary-color"
								: ""
						}`}
						href="/"
					>
						<p>Home</p>
					</Link>
					<Link
						className={` hover:text-secondary-color${
							pathname === "/wishlist"
								? " border-b-2 border-secondary-color text-secondary-color"
								: ""
						}`}
						href="/wishlist"
					>
						<p>Wishlist</p>
					</Link>
					<Link href="/prods">
						<p>Products</p>
					</Link>
					<Link href="/shop">
						<p>Shop</p>
					</Link>
					<Link href="/others">
						<p>Other Pages</p>
					</Link>
					<Link href="/blog">
						<p>Blog</p>
					</Link>
				</div>

				{/* mobile */}
				<div className="semiLarge:hidden">
					<Link href="/cart">
						<div className="relative">
							<p className="bg-secondary-color text-xs text-primary-color  semiLarge:flex h-4 w-4 rounded-[50%] text-center justify-center items-center absolute -top-1 -right-2">
								{cartCount}
							</p>
							<AiOutlineShoppingCart size={24} />
						</div>
					</Link>
				</div>

				{/* desktop */}
				<div className="hidden semiLarge:flex items-center gap-8">
					<div className="rounded-full p-1.5  hover:bg-slate-200 cursor-pointer">
						<IoSearch size={22} />
					</div>
					<div
						onClick={() => setShowProfile(true)}
						className="rounded-full p-1.5  hover:bg-slate-200 cursor-pointer"
					>
						{user ? (
							<div className="rounded-full w-[30px] h-[30px] bg-secondary-color text-primary-color text-xs font-semibold flex items-center justify-center">
								{user.firstName?.[0]?.toUpperCase()}
								{user.lastName?.[0]?.toUpperCase()}
							</div>
						) : (
							<FaRegUser size={20} className="cursor-pointer" />
						)}
					</div>
					<Link href="/wishlist">
						<div className="relative">
							<p className="bg-secondary-color text-xs text-primary-color  semiLarge:flex h-4 w-4 rounded-[50%]  justify-center items-center absolute -top-1 -right-2">
								{wishlist.length}
							</p>
							<IoIosStarOutline size={24} />
						</div>
					</Link>
					<Link href="/cart">
						<div className="relative">
							<p className="bg-secondary-color text-xs text-primary-color  semiLarge:flex h-4 w-4 rounded-[50%] text-center  justify-center items-center absolute -top-1 -right-2">
								{cartCount}
							</p>
							<AiOutlineShoppingCart size={24} />
						</div>
					</Link>
					<ProfileTab isOpen={showProfle} setIsOpen={setShowProfile} />
				</div>
			</nav>
			<hr className="border-[secondary-text-color] mx-4" />
		</>
	);
};

export default Navbar;
