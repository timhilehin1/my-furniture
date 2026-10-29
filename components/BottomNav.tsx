"use client";
import React, { useState } from "react";
import {
	IoHomeOutline,
	IoCartOutline,
	IoPersonOutline,
	IoGridOutline,
} from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import Link from "next/link";
import ProfileTab from "./ProfileTab";
import { useProfile } from "@/hooks/api/useAuth";
import { useCartCount } from "@/hooks/api/useCart";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function BottomNav() {
	const { data: user } = useProfile();

	const [showProfle, setShowProfile] = useState<boolean>(false);
	const wishlist = useAppSelector((state) => state.wishlist);
	const cartCount = useCartCount();
	return (
		<section className="flex items-center semiLarge:hidden gap-4 fixed bottom-0 left-0 right-0 w-full py-4 px-8 justify-between bg-primary-color z-50">
			<Link href="/">
				<div className="text-black border-r flex flex-col gap-0.5 justify-center items-center pr-6  ">
					<IoHomeOutline size={26} />
					<p className="text-xs text-center text-secondary-text-color">Home</p>
				</div>
			</Link>

			<Link href="/cart">
				<div className="text-black border-r flex flex-col gap-0.5 justify-center items-center  pr-6 relative">
					<p className="bg-secondary-color text-sm text-primary-color  flex h-4 w-4 rounded-[50%]  justify-center items-center absolute right-[1.12rem] -top-0.5">
						{cartCount}
					</p>
					<AiOutlineShoppingCart size={28} />
					<p className="text-xs text-center text-secondary-text-color">
						Cart
					</p>
				</div>
			</Link>
			<Link href="/wishlist">
				<div className="text-black border-r flex flex-col gap-0.5 justify-center items-center  pr-6 relative">
					<p className="bg-secondary-color text-sm text-primary-color  flex h-4 w-4 rounded-[50%]  justify-center items-center absolute right-[1.12rem] -top-0.5">
						{wishlist.length}
					</p>
					<FaRegHeart size={24} />
					<p className="text-xs text-center text-secondary-text-color">
						Wishlist
					</p>
				</div>
			</Link>
			<div
				onClick={() => setShowProfile(true)}
				className="text-black  flex flex-col gap-0.5 justify-center items-center "
			>
				{user ? (
					<div className="rounded">
						<div className="rounded-full w-[30px] h-[30px] mx-auto bg-secondary-color text-primary-color text-xs font-semibold flex items-center justify-center">
								{user.firstName?.[0]?.toUpperCase()}
								{user.lastName?.[0]?.toUpperCase()}
							</div>
						<p className="text-xs text-center text-secondary-text-color">
							Account
						</p>
					</div>
				) : (
					<>
						<IoPersonOutline size={26} />
						<p className="text-xs text-center text-secondary-text-color">
							Account
						</p>
					</>
				)}
			</div>
			<ProfileTab isOpen={showProfle} setIsOpen={setShowProfile} />
		</section>
	);
}
