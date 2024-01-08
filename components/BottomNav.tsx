"use client";
import React from "react";
import {
	IoHomeOutline,
	IoCartOutline,
	IoPersonOutline,
	IoGridOutline,
} from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import Link from "next/link";

export default function BottomNav() {
	const wishlist = useAppSelector((state) => state.wishlist);
	return (
		<section className='flex items-center semiLarge:hidden gap-4 fixed bottom-0 left-0 right-0 w-full py-4 px-8 justify-between bg-primary-color z-50'>
			<Link href='/'>
				<div className='text-black border-r flex flex-col gap-0.5 justify-center items-center pr-6  '>
					<IoHomeOutline size={26} />
					<p className='text-xs text-center text-secondary-text-color'>Home</p>
				</div>
			</Link>
			<div className='text-black border-r flex flex-col gap-0.5 justify-center items-center  pr-6'>
				<IoGridOutline size={26} />
				<p className='text-xs text-center text-secondary-text-color'>
					Shopping
				</p>
			</div>
			<Link href='/wishlist'>
				<div className='text-black border-r flex flex-col gap-0.5 justify-center items-center  pr-6 relative'>
					<p className='bg-secondary-color text-sm text-primary-color  flex h-4 w-4 rounded-[50%]  justify-center items-center absolute right-[1.12rem] -top-0.5'>
						{wishlist.length}
					</p>
					<FaRegHeart size={24} />
					<p className='text-xs text-center text-secondary-text-color'>
						Wishlist
					</p>
				</div>
			</Link>
			<div className='text-black  flex flex-col gap-0.5 justify-center items-center '>
				<IoPersonOutline size={26} />
				<p className='text-xs text-center text-secondary-text-color'>Account</p>
			</div>
		</section>
	);
}
