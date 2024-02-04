"use client";
import React, { useCallback, useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { fetchProducts, fetchGalleryImages } from "@/sanity/sanity.query";
import {
	ProductInterface,
	imageInterface,
	ProductSectionInterface,
} from "@/interfaces/product.interface";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import ProductCard from "./ProductCard";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addToWishlist, removeFromWishlist } from "@/lib/slices/wishlistSlice";
import { addToCart, removeFromCart } from "@/lib/slices/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function NewArrivals() {
	const dispatch = useAppDispatch();
	const wishlist = useAppSelector((state) => state.wishlist);
	const cart = useAppSelector((state) => state.cart);
	// console.log(cart);
	useEffect(() => {
		getData();
		getGalleryImages();
	}, []);
	const [newArrivals, setNewArrivals] = useState<ProductInterface[]>([]);
	const [galleryImages, setGalleryImages] = useState<imageInterface[]>([]);
	const new_arrivals = "ARRIVALS";
	const numArr = [1];
	const numArrayAlt = [1, 2, 3, 4, 5, 6];

	const getData = async () => {
		try {
			const data = await fetchProducts();
			// console.log(data);
			const newlyArrivedProducts = data.filter((item: ProductInterface) =>
				item.productSection.some(
					(section: ProductSectionInterface) =>
						section.sectionName === new_arrivals
				)
			);
			if (newlyArrivedProducts.length <= 0) {
				alert("No new arrivals yet");
				setNewArrivals([]);
				return;
			} else {
				setNewArrivals(newlyArrivedProducts);
			}
		} catch (err) {
			console.log(err);
			setNewArrivals([]);
		}
	};

	const getGalleryImages = async () => {
		try {
			const data = await fetchGalleryImages();
			// console.log(data[0].images);
			setGalleryImages(data[0].images);
		} catch (err) {
			console.log(err);
			setGalleryImages([]);
		}
	};

	const handleAddToWishlist = (
		item: ProductInterface,
		event: React.SyntheticEvent
	) => {
		event.preventDefault();
		// save to global store
		dispatch(addToWishlist(item));
		toast.success(`${item.productName} has been added to wishlist`, {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			progressClassName: "fancy-progress-bar",
			// theme: "light",
		});
	};

	const handleRemoveFromWishlist = (
		item: ProductInterface,
		event: React.SyntheticEvent
	) => {
		event.preventDefault();
		dispatch(removeFromWishlist(item));
	};

	//check if item is in wishlist state(redux)
	const isAlreadyInWishList = (itemId: string) => {
		return wishlist.some((item) => item._id === itemId);
	};

	const handleAddToCart = (
		item: ProductInterface,
		event: React.SyntheticEvent
	) => {
		event.preventDefault();
		dispatch(addToCart(item));
		toast.success(`${item.productName} has been added to cart`, {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			progressClassName: "fancy-progress-bar",
			// theme: "light",
		});
	};

	//it works sha
	const sliderRef = useRef(null);
	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return;
		(sliderRef.current as any)?.swiper.slidePrev();
	}, []);

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return;
		(sliderRef.current as any)?.swiper.slideNext();
	}, []);
	return (
		<section className='mt-8 p-4'>
			<ToastContainer
				position='bottom-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				style={{ fontSize: "12px", fontFamily: "Jost" }}
				// progressClassName={()=>"bg-gray-950 h-4"}
				// theme='light'
			/>
			<header className='font-semibold text-base mt-4 md:text-3xl text-center'>
				New Arrivals
			</header>
			<div className='flex flex-col semiLarge:flex-row gap-4 mt-8'>
				<section className='h-full  object-cover w-full semiLarge:w-1/4 relative'>
					{galleryImages.length > 0 ? (
						<div className='button_group flex gap-4 absolute right-1 bottom-1 z-20'>
							<button
								onClick={handlePrev}
								className='bg-primary-color border-2 border-secondary-color text-secondary-color rounded p-3'
							>
								<MdOutlineChevronLeft size={24} />
							</button>
							<button
								onClick={handleNext}
								className='bg-primary-color border-2 border-secondary-color text-secondary-color rounded p-3'
							>
								<MdOutlineChevronRight size={24} />
							</button>
						</div>
					) : null}
					<div className='button_group flex gap-4 absolute right-1 bottom-1 z-20'>
						<button
							onClick={handlePrev}
							className='bg-primary-color border-2 border-secondary-color text-secondary-color rounded p-3'
						>
							<MdOutlineChevronLeft size={24} />
						</button>
						<button
							onClick={handleNext}
							className='bg-primary-color border-2 border-secondary-color text-secondary-color rounded p-3'
						>
							<MdOutlineChevronRight size={24} />
						</button>
					</div>
					<Swiper
						ref={sliderRef}
						spaceBetween={30}
						slidesPerView={1}
						// freeMode={true}
						// loop={true}
						autoplay={{
							delay: 10000,
							disableOnInteraction: true,
						}}
						className='mySwiper'
					>
						{galleryImages.length > 0
							? galleryImages.map((item, index) => (
									<SwiperSlide key={index}>
										<Image
											key={index}
											priority={true}
											src={item?.imageUrl}
											alt={item?.attribution}
											width={0}
											height={0}
											sizes='100%'
											style={{
												width: "100%",
												height: "auto",
												objectFit: "cover",
											}}
										/>
									</SwiperSlide>
							  ))
							: numArr.map((el, index) => (
									<div key={index}>
										<Skeleton
											containerClassName='flex-1'
											height={580}
											duration={2}
											baseColor={"#e6e8ec"}
										/>
									</div>
							  ))}
					</Swiper>
				</section>
				<section className='w-full semiLarge:w-9/12 grid grid-cols-2 semiLarge:grid-cols-3 gap-6'>
					{newArrivals.length > 0
						? newArrivals.map((item, index) => (
								// card component begins here
								<ProductCard
									key={index}
									discountStatus={item?.discountStatus}
									productName={item?.productName}
									productPrice={item?.productPrice}
									discountPrice={item?.discountPrice}
									productImages={item?.productImages}
									_id={item._id}
									slug={item.slug}
									handleAddToCart={(e) => handleAddToCart(item, e)}
									// handleRemoveFromCart={(e)=>handleRemoveFromCart(item, e)}
									handleAddToWishlist={(e) => handleAddToWishlist(item, e)}
									handleRemoveFromWishlist={(e) =>
										handleRemoveFromWishlist(item, e)
									}
									isAlreadyInWishList={isAlreadyInWishList(item._id)}
									// handleAddToCompare={handleAddToCompare}
									// handleRemoveFromCompare={handleRemoveFromCompare}
									// handleQuickView={handleQuickView}
								/>
						  ))
						: numArrayAlt.map((el) => (
								<>
									<Skeleton
										containerClassName='flex-1'
										height={360}
										duration={2}
										baseColor={"#e6e8ec"}
									/>
								</>
						  ))}
				</section>
			</div>
		</section>
	);
}

export default NewArrivals;
