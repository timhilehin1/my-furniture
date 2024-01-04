import React from "react";
import Image from "next/image";
import { blogInterface } from "@/interfaces/blog.interface";
import {convertDateToText} from "@/utils/utils";

function NewsCard({
	blogImage,
	blogTitle,
	blogContent,
	blogDate,
	blogAuthor,
}: blogInterface) {
	return (
		<section className='flex mt-8 px-6 items-center flex-col gap-8 semiLarge:gap-16 semiLarge:flex-row'>
			<div className='w-full semiLarge:w-1/2'>
				<Image
					src={blogImage.imageUrl}
					priority={true}
					alt={blogImage.attribution || "image"}
					width={0}
					height={0}
					sizes='100%'
					style={{ width: "100%", height: "auto", objectFit: "cover" }}
				/>
			</div>
			<div className='flex flex-col gap-4 self-center w-full semiLarge:w-1/2'>
				<p className='text-secondary-text-color text-sm'>
					{convertDateToText(blogDate)} <span className='text-black'>by {blogAuthor}</span>
				</p>
				<header className='text-xl font-medium hover:text-secondary-color cursor-pointer'>
					{blogTitle}
				</header>
				<main className='text-secondary-text-color text-sm'>
					{blogContent[0].children[0].text.substring(0, 200)}...
				</main>
				<button className='border-solid  border-2 border-black hover:bg-secondary-color hover:border-secondary-color rounded-md py-2 px-2.5 md:py-2.5 md:px-4  text-xs md:text-sm self-center semiLarge:self-start hover:text-primary-color'>
					Read More
				</button>
			</div>
		</section>
	);
}

export default NewsCard;
