"use client";
import React, { useEffect } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toggleSidebar } from "@/lib/slices/sidebarSlice";
function Sidebar() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const sidebar = useAppSelector((state) => state.sidebar);
	useEffect(() => {
		sidebar.SidebarStatus
			? (document.body.style.overflow = "hidden")
			: (document.body.style.overflow = "auto");
	}, [sidebar.SidebarStatus]);

	const handleRoute = (route: string) => {
		router.push(route);
		dispatch(toggleSidebar());
	};
	return (
		<section
			className={`h-full w-3/6 transition ease-in-out duration-500  bg-[#fff] flex flex-col gap-4 fixed z-50 ${
				sidebar.SidebarStatus ? "translate-x-0" : "-translate-x-full"
			} font-medium`}
		>
			{/* <div className='bg-text-secondary-color p-2.5 flex items-center border-b-2'>
				Searchbar
			</div> */}

			<div onClick={() => handleRoute("/")} className='p-2.5 border-b-2'>
				Home
			</div>

			<div onClick={() => handleRoute("/cart")} className='p-2.5 border-b-2'>
				Cart
			</div>

			<div onClick={() => handleRoute("/")} className='p-2.5 border-b-2'>
				Products
			</div>

			<div onClick={() => handleRoute("/")} className='p-2.5 border-b-2'>
				Other Pages
			</div>

			<div onClick={() => handleRoute("/")} className='p-2.5 border-b-2'>
				Blog
			</div>

			<footer className='flex text-xs z-[1000px] absolute top-[65%]   flex-col gap-4'>
				{/* <p>
					Call us:{" "}
					<span className='text-secondary-text-color px-2'>(+234)8138109620</span>
				</p>

				<p>
					Email:{" "}
					<span className='text-secondary-text-color px-2'>
						timilehinoladapo0@gmail.com
					</span>
				</p> */}

				<div className='flex text-black gap-6 items-center px-2'>
					<Link href={"https://twitter.com/Timhilehin"}>
						<FaXTwitter size={24} />
					</Link>
					<Link href={"/https://github.com/timhilehin1"}>
						<FaGithub size={24} />
					</Link>
					<Link href={"/https://www.linkedin.com/in/timilehinoladapo"}>
						<FaLinkedin size={24} />
					</Link>
					<Link href={"/products"}>
						<FaInstagram size={24} />
					</Link>
				</div>
			</footer>
		</section>
	);
}

export default Sidebar;
