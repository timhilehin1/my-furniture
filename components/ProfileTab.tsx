import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { MdClose } from "react-icons/md";
import { capitalizeFirstLetter } from "@/utils/utils";
import { FaUser } from "react-icons/fa";

function ProfileTab({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: (arg0: boolean) => void;
}) {
	const { user } = useUser();
	// console.log(user);
	const router = useRouter();
	const [formData, setFormData] = useState({
		currency: "",
		language: "",
	});

	// State to keep track of whether the overlay should be shown
	const [showOverlay, setShowOverlay] = useState(isOpen);

	useEffect(() => {
		// Show overlay when the sidebar is opened
		if (isOpen) {
			setShowOverlay(true);
		}
	}, [isOpen]);

	const handleClose = () => {
		// Hide sidebar
		setIsOpen(false);
		// Hide overlay after transition
		setTimeout(() => setShowOverlay(false), 300); // Adjust this duration to match your transition duration
	};

	return (
		<>
			{showOverlay && (
				<section className="modal_container fixed top-0 left-0 bg-black/30 z-[1000] flex items-center justify-center h-screen w-full">
					<div
						onClick={handleClose}
						className="closing_modal absolute cursor-pointer top-0 left-0 bg-transparent w-full h-full"
					></div>
					<div
						className={` p-6 fixed top-0 right-0 z-50 w-3/4 md:w-1/4 pt-20 lg:pt-24 text-lg flex gap-8 flex-col h-full bg-white transform transition-transform duration-300 ${
							isOpen ? "translate-x-0" : "translate-x-full"
						}`}
					>
						{user && (
							<>
								<div
									onClick={handleClose}
									className="absolute top-6 left-8 text-secondary-color font-semibold"
								>
									{user && user.name.split(" ").length > 1 ? (
										`Hi, ${capitalizeFirstLetter(user.name.split(" ")[0])}`
									) : (
										<div className="flex gap-2 items-center">
											<FaUser />
											{user?.name?.substring(0,17) ?? ""}...
										</div>
									)}
								</div>
							</>
						)}

						<div
							onClick={handleClose}
							className="absolute top-4 right-4 cursor-pointer rounded-full p-0.5 border border-secondary-color"
						>
							<MdClose size={22} />
						</div>

						{/* //hide signup and register when user is logged in */}
						{user ? (
							""
						) : (
							<>
								{" "}
								<p
									onClick={() => {
										router.push("/api/auth/login");
										handleClose();
									}}
									className="cursor-pointer hover:bg-slate-200 p-1 hover:rounded-lg"
								>
									Login
								</p>
								<p
									onClick={() => {
										router.push("/api/auth/signup");
										handleClose();
									}}
									className="cursor-pointer hover:bg-slate-200 p-1 hover:rounded-lg"
								>
									Register
								</p>
							</>
						)}

						<p
							onClick={() => {
								router.push("/wishlist");
								handleClose();
							}}
							className="cursor-pointer hover:bg-slate-200 p-1 hover:rounded-lg"
						>
							Wishlist
						</p>

						<p className="cursor-pointer hover:bg-slate-200 p-1 hover:rounded-lg">
							Checkout
						</p>
						<p
							className="cursor-pointer hover:bg-slate-200 p-1 hover:rounded-lg"
							onClick={() => {
								router.push("/api/auth/logout");
								handleClose();
							}}
						>
							Logout
						</p>
						<hr className="border-[secondary-text-color]" />
						<p>Currency</p>
						<select
							name="currency"
							className="p-2.5  w-full bg-slate-200  focus:outline-none rounded text-xs"
							onChange={(e) =>
								setFormData({ ...formData, [e.target.name]: e.target.value })
							}
							value={formData.currency}
						>
							<option value={"ng"}>Naira</option>
							<option value={"usd"}>USD</option>
							<option value={"euro"}>Euro</option>
						</select>
						<p>Language</p>
						<select
							name="language"
							className="p-2.5  w-full bg-slate-200 focus:outline-none rounded text-xs"
							onChange={(e) =>
								setFormData({ ...formData, [e.target.name]: e.target.value })
							}
							value={formData.language}
						>
							<option value={"eng"}>English</option>
							<option value={"fre"}>French</option>
							<option value={"deu"}>German</option>
						</select>
					</div>
				</section>
			)}
		</>
	);
}

export default ProfileTab;
