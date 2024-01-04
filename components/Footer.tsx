"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineChair } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import { CgMail } from "react-icons/cg";
import {
	FaGithub,
	FaLinkedin,
	FaInstagram,
	FaCcMastercard,
	FaPaypal,
	FaApplePay,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiVisa } from "react-icons/si";
import Image from "next/image";
import AccordionComponent from "./Accordion";
import { fetchBusinessInformation } from "@/sanity/sanity.query";
import { informationInterface } from "@/interfaces/Information.interface";

function Footer() {
	useEffect(() => {
		getData();
	}, []);
	const [data, setData] = useState<informationInterface[]>([]);

	const getData = async () => {
		try {
			const data = await fetchBusinessInformation();
			// console.log(data)
			setData(data)
		} catch (err) {
			console.log(err);
			setData([]);
		}
	};
	return (
		<>
			<section className='p-4 mt-16 flex flex-wrap gap-4 justify-between'>
				<div className='flex text-secondary-text-color flex-col gap-8'>
					<div className='flex text-xl font-medium text-black flex-row items-center gap-2'>
						<MdOutlineChair size={30} />
						<p>{data[0]?.businessName}</p>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<CiLocationOn size={24} />
						<p>{data[0]?.businessAddress}</p>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<IoIosCall size={24} />
						<p>{data[0]?.businessPhone}</p>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<CgMail size={24} />
						<p>{data[0]?.businessEmail}</p>
					</div>
				</div>

				{/* //mobile accordion */}
				<div className='mobile-view block semiLarge:hidden w-full'>
					<AccordionComponent title={"About us"}>
						<div className='flex w-full semiLarge:hidden  text-secondary-text-color flex-col gap-4'>
							<div className='flex flex-row items-center gap-2'>
								<p>FAQ'S</p>
							</div>
							<div className='flex flex-row items-center gap-2'>
								<p>Shipping</p>
							</div>
							<div className='flex flex-row items-center gap-2'>
								<p>Return</p>
							</div>
						</div>
					</AccordionComponent>

					<AccordionComponent title={"Customer Service"}>
						<div className='flex w-full semiLarge:hidden  text-secondary-text-color flex-col gap-4'>
							<div className='flex flex-row items-center gap-2'>
								<p>Our story</p>
							</div>
							<div className='flex flex-row items-center gap-2'>
								<p>Our team</p>
							</div>
							<div className='flex flex-row items-center gap-2'>
								<p>Designers</p>
							</div>
						</div>
					</AccordionComponent>

					<AccordionComponent title={"Support"}>
						<div className='flex w-full semiLarge:hidden  text-secondary-text-color flex-col gap-4'>
							<div className='flex flex-row items-center gap-2'>
								<p>FAQ'S</p>
							</div>
							<div className='flex flex-row items-center gap-2'>
								<p>Shipping</p>
							</div>
							<div className='flex flex-row items-center gap-2'>
								<p>Return</p>
							</div>
						</div>
					</AccordionComponent>

					<AccordionComponent title={"Newsletters"}>
						<div className='flex  semiLarge:hidden  text-secondary-text-color flex-col gap-4'>
							<div className='flex items-center'>
								<input
									type='text'
									placeholder='Enter your email'
									className='border-2 border-black rounded-md px-2 py-2 text-sm text-secondary-text-color'
								/>
								<button className='bg-secondary-color text-white px-2 py-2 rounded-md border-none'>
									Submit
								</button>
							</div>
							<div className='flex text-black gap-4 items-center'>
								<FaXTwitter size={24} />
								<FaGithub size={24} />
								<FaLinkedin size={24} />
								<FaInstagram size={24} />
							</div>
						</div>
					</AccordionComponent>
				</div>
				{/* end of mobile accordion */}

				<div className='hidden semiLarge:flex text-secondary-text-color flex-col gap-8'>
					<div className='text-black text-lg'>About Us</div>
					<div className='flex flex-row items-center gap-2'>
						<p>Our story</p>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<p>Our team</p>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<p>Designers</p>
					</div>
				</div>

				<div className='hidden semiLarge:flex  text-secondary-text-color flex-col gap-8'>
					<div className='text-black text-lg'>Customer Service</div>
					<div className='flex flex-row items-center gap-2'>
						<p>Home</p>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<p>Products</p>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<p>Contacts</p>
					</div>
				</div>

				<div className='hidden semiLarge:flex  text-secondary-text-color flex-col gap-8'>
					<div className='text-black text-lg'>Support</div>
					<div className='flex flex-row items-center gap-2'>
						<p>FAQ's</p>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<p>Shipping</p>
					</div>
					<div className='flex flex-row items-center gap-2'>
						<p>Return</p>
					</div>
				</div>

				<div className='hidden semiLarge:flex  flex-col gap-6'>
					<div className='text-black text-lg'>Newsletters</div>
					<div className='flex items-center'>
						<input
							type='text'
							placeholder='Enter your email'
							className='border-2 border-black rounded-md px-2 py-2 text-sm text-secondary-text-color'
						/>
						<button className='bg-secondary-color text-white px-2 py-2 rounded-md border-none'>
							Submit
						</button>
					</div>
					<div className='flex gap-4 items-center'>
						<FaXTwitter size={24} />
						<FaGithub size={24} />
						<FaLinkedin size={24} />
						<FaInstagram size={24} />
					</div>
				</div>
			</section>
			<hr className='border-[secondary-text-color] mx-4' />

			<section className='p-4 flex justify-center items-center gap-4 cursor-pointer'>
				{/* find a way to get mastercard and paypal icons and render images in next 14 properly */}
				<div className='text-[#142688]'>
					<SiVisa size={30} />
				</div>
				<div>
					<FaCcMastercard size={30} />
				</div>
				<div className='text-[#142688]'>
					<FaPaypal size={30} />
				</div>
				<div>
					<FaApplePay size={35} />
				</div>
			</section>
		</>
	);
}

export default Footer;
