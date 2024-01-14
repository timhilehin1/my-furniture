"use client";
import React, { useEffect, useState } from "react";
import { fetchProductBySlug } from "@/sanity/sanity.query";
import { IoHomeOutline } from "react-icons/io5";
import Image from "next/image";
import {
	ProductInterface,
	imageInterface,
	ProductSectionInterface,
} from "@/interfaces/product.interface";
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { getNairaFormat } from "@/utils/utils";
import ProgressBar from "@ramonak/react-progress-bar";
import { FiMinus } from "react-icons/fi";
import { SiVisa } from "react-icons/si";
import { IoMdShare } from "react-icons/io";
import { GoQuestion, GoPlus } from "react-icons/go";
import { MdInsertComment } from "react-icons/md";
import { FaCcMastercard, FaPaypal, FaApplePay } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function ProductDetailsPage({ slug }: { slug: string }) {
	const [product, setProduct] = useState<ProductInterface[]>([]);
	const [selectables, setSelectables] = useState({
		selectedSize: "" as string,
		selectedColor: "" as string,
	});
	const itemSold = 36;
	useEffect(() => {
		getProduct();
	}, []);

	const [value, setValue] = useState<number>(0);
	//accessibility prop for screen readers
	function accessibilityProps(index: number) {
		return {
			id: `productsDetails-tab-${index}`,
			"aria-controls": `productsDetails-tabpanel-${index}`,
		};
	}

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	const getProduct = async () => {
		try {
			const data = await fetchProductBySlug(slug);
			console.log(data);
			setProduct(data);
		} catch (err) {
			console.log(err);
			setProduct([]);
		}
	};
	return (
		<section className='mt-4 p-4'>
			{/* //reusable component in prduct tails and wishlist */}
			<header className='flex gap-1 items-center text-sm font-medium'>
				<div className='flex gap-2 items-center'>
					<IoHomeOutline size={12} />
					<p>Home</p>
				</div>
				<p className='font-bold'>.</p>
				<div>{product[0]?.productName}</div>
			</header>

			<main className='grid grid-cols-1 semiLarge:grid-cols-2 gap-9 lg:gap-8 mt-4'>
				<div className='image cursor-pointer'>
					<Image
						priority={true}
						src={
							product.length > 0 ? product[0]?.productImages[0]?.imageUrl : ""
						}
						alt={""}
						width={0}
						height={0}
						sizes='100%'
						style={{
							width: "100%",
							height: "auto",
							objectFit: "cover",
							mixBlendMode: "normal",
						}}
					/>
					<div className='flex gap-4 items-center mt-4 justify-between p-2'>
						<div className='mini-image bg-slate-200 cursor-pointer'>
							<Image
								priority={true}
								src={
									product.length > 0
										? product[0]?.productImages[0]?.imageUrl
										: ""
								}
								alt={""}
								width={0}
								height={0}
								sizes='100%'
								style={{
									width: "100%",
									height: "100px",
									objectFit: "cover",
									mixBlendMode: "normal",
								}}
							/>
						</div>

						<div className='mini-image bg-slate-200 cursor-pointer'>
							<Image
								priority={true}
								src={
									product.length > 0
										? product[0]?.productImages[0]?.imageUrl
										: ""
								}
								alt={""}
								width={0}
								height={0}
								sizes='100%'
								style={{
									width: "100%",
									height: "100px",
									objectFit: "cover",
									mixBlendMode: "normal",
								}}
							/>
						</div>

						<div className='mini-image bg-slate-200 cursor-pointer'>
							<Image
								priority={true}
								src={
									product.length > 0
										? product[0]?.productImages[0]?.imageUrl
										: ""
								}
								alt={""}
								width={0}
								height={0}
								sizes='100%'
								style={{
									width: "100%",
									height: "6.25rem",
									objectFit: "cover",
									mixBlendMode: "normal",
								}}
							/>
						</div>

						<div className='mini-image bg-slate-200 cursor-pointer'>
							<Image
								priority={true}
								src={
									product.length > 0
										? product[0]?.productImages[0]?.imageUrl
										: ""
								}
								alt={""}
								width={0}
								height={0}
								sizes='100%'
								style={{
									width: "100%",
									height: "6.25rem",
									objectFit: "cover",
									mixBlendMode: "normal",
								}}
							/>
						</div>

						<div className='mini-image bg-slate-200 cursor-pointer'>
							<Image
								priority={true}
								src={
									product.length > 0
										? product[0]?.productImages[0]?.imageUrl
										: ""
								}
								alt={""}
								width={0}
								height={0}
								sizes='100%'
								style={{
									width: "100%",
									height: "6.25rem",
									objectFit: "cover",
									mixBlendMode: "normal",
								}}
							/>
						</div>
					</div>
				</div>

				<section className='details flex flex-col gap-4 px-8'>
					<div className='text-lg font-bold flex justify-between items-center'>
						<p>{product[0]?.productName}</p>
						<p className='bg-secondary-color h-8 w-8 rounded-[50%] flex justify-center items-center text-primary-color'>
							<FaStar size={16} />
						</p>
					</div>

					<div className='flex gap-4 cursor-pointer'>
						<Stack spacing={1}>
							<Rating
								name='half-rating-read'
								defaultValue={0}
								size='small'
								// precision={0.5}
								readOnly
							/>
						</Stack>
						<p className='font-semibold text-xs'>VIEW ALL REVIEWS</p>
					</div>

					<div className='product_Price text-lg font-bold'>
						{getNairaFormat(product[0]?.productPrice?.toString())}
					</div>

					<div className='cursor-pointer'>
						<ProgressBar
							bgColor='linear-gradient(90deg, rgba(249, 200, 88, 1), rgba(255, 130, 70, 1) 100%)'
							completed={itemSold}
							isLabelVisible={false}
							height='9px'
						/>
					</div>

					<p className='text-secondary-text-color text-xs font-semibold'>
						{itemSold}% Sold . Only 951 item(s) left in stock!
					</p>

					<div className='flex gap-4 items-center'>
						<p className='font-black text-xs'>TAGS:</p>
						<p className='text-xs text-secondary-text-color'>
							13.7 x 6.3' x 4, White
						</p>
					</div>

					<div className='flex gap-4 items-center'>
						<p className='font-black text-xs'>CATEGORY:</p>
						<p className='text-xs text-secondary-text-color'>
							{product[0]?.productCategory.length > 0 &&
								product[0]?.productCategory
									.map((cat) => cat.categoryName)
									.join(",")
									?.toUpperCase()}
						</p>
					</div>

					<div className='flex gap-4 items-center'>
						<p className='font-black text-xs'>SIZE:</p>
						<p className='text-sm font-semibold'>{selectables?.selectedSize}</p>
					</div>

					<select
						name='selectedSize'
						className='p-2.5 border-solid border w-1/2 focus:border-[#0a5d5d] focus:outline-none rounded'
						onChange={(e) =>
							setSelectables({
								...selectables,
								[e.target.name]: e.target.value,
							})
						}
						value={selectables.selectedSize}
					>
						<option value={""}>Select size</option>
						{product[0]?.productSize?.map((item) => (
							<option value={item.sizeName}>{item.sizeName}</option>
						))}
					</select>

					<div className='flex gap-4 items-center'>
						<p className='font-black text-xs'>COLOR:</p>
						<p className='text-sm font-semibold'>
							{selectables?.selectedColor}
						</p>
					</div>
					<select
						name='selectedColor'
						className='p-2.5 border-solid border w-1/2 focus:border-[#0a5d5d] focus:outline-none rounded'
						onChange={(e) =>
							setSelectables({
								...selectables,
								[e.target.name]: e.target.value,
							})
						}
						value={selectables.selectedColor}
					>
						<option value={""}>Select color</option>
						{product[0]?.productColor?.map((item) => (
							<option value={item.colorName}>{item.colorName}</option>
						))}
					</select>

					{/* //quantity */}
					<p className='font-black text-xs'>QUANTITY:</p>
					<section className='flex gap-2.5'>
						<div className='flex justify-between items-center p-2.5 border-solid border text-sm w-3/12 rounded'>
							<div className='text-secondary-text-color cursor-pointer hover:text-secondary-color'>
								<GoPlus size={16} />
							</div>
							<p>1</p>
							<div className='text-secondary-text-color cursor-pointer hover:text-secondary-color'>
								<FiMinus size={16} />
							</div>
						</div>

						<button className='w-9/12 text-sm font-semibold text-white bg-secondary-color p-2.5 rounded'>
							ADD TO BAG
						</button>
					</section>

					{/* buy with paypal button */}
					<button className='bg-yellow-400 p-2.5 cursor-pointer text-sm font-semibold rounded text-blue-700 flex justify-center items-center'>
						Buy With <SiVisa size={30} />
					</button>

					<div className='flex gap-6  text-sm font-normal cursor-pointer'>
						<div className='flex gap-2.5 items-center'>
							<IoMdShare size={16} />
							<p>SHARE</p>
						</div>
						<div className='flex gap-4 items-center'>
							<GoQuestion size={16} />
							<p>ASK A QUESTION</p>
						</div>
						<div className='flex gap-4 items-center'>
							<MdInsertComment size={16} />
							<p>FAQ</p>
						</div>
					</div>

					<hr className='border-[secondary-text-color]' />

					<p className='font-bold text-sm'>GUARANTEED SAFE CHECKOUT:</p>
					<section className='flex  items-center gap-4 cursor-pointer'>
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

					<div className='flex gap-4 items-center text-sm text-black'>
						<CiClock2 size={16} />
						<p>Orders Orders ship within 5 to 10 business days.</p>
					</div>

					<div className='flex gap-4 items-center text-sm text-black'>
						<CiDeliveryTruck size={18} />
						<p>Hoorey! This item ships free to the Ota.</p>
					</div>
				</section>
			</main>

			<Box
				sx={{
					borderColor: "#0a5d5d",
					paddingBottom: "1rem",
					display: "flex",
					marginTop: "2rem",
				}}
			>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='products Details tab'
					TabIndicatorProps={{
						style: { background: "#0a5d5d", bottom: "1px", fontWeight: "900" },
					}}
					textColor='inherit'
				>
					<Tab
						sx={{
							color: "#6C757D",
							fontWeight: "bolder",
						}}
						label='DESCRIPTION'
						{...accessibilityProps(0)}
					/>
					<Tab
						sx={{
							color: "#6C757D",
							fontWeight: "bolder",
						}}
						label='DELIVERY POLICY'
						{...accessibilityProps(1)}
					/>
					<Tab
						sx={{
							color: "#6C757D",
							fontWeight: "bolder",
						}}
						label='SHIPPING & RETURNS'
						{...accessibilityProps(2)}
					/>
				</Tabs>
			</Box>
			<hr className='border-[secondary-text-color]' />
			{/* //tabs */}
			<div
				className='mt-6 text-secondary-text-color text-sm'
				role='tabpanel'
				hidden={value !== 0}
				id={"description-tabpanel"}
				aria-labelledby={"description-tab"}
			>
				{product[0]?.productDescription}
			</div>

			<div
				className='mt-6 text-secondary-text-color text-sm'
				role='tabpanel'
				hidden={value !== 1}
				id={"delivery-policy-tabpanel"}
				aria-labelledby={"delivery-policy-tab"}
			>
				{product[0]?.productDescription} delivery policy
			</div>

			<div
				className='mt-6 text-secondary-text-color text-sm'
				role='tabpanel'
				hidden={value !== 2}
				id={"shipping-tabpanel"}
				aria-labelledby={"shipping-tab"}
			>
				{product[0]?.productDescription}shipping and returns
			</div>
		</section>
	);
}

export default ProductDetailsPage;
