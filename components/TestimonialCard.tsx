import React from "react";
import Image from "next/image";
import { RiDoubleQuotesR } from "react-icons/ri";
import { TestimonialInterface } from "@/interfaces/testimonial.interface";


function TestimonialCard({ testimonialImage,testimonialName, testimonialText, testimonialDesignation }: TestimonialInterface) {
	return (
		<section className='flex lg:max-h-64 py-8 px-4 flex-col items-center justify-center semiLarge:flex-row semiLarge:justify-between border-2 gap-12 shadow-[0_0_25px_rgba(0,0,0,0.08)]'>
			{/* <div className='flex flex-col gap-2'> */}
			<div className='w-1/2  flex flex-col gap-2 justify-center'>
				<div>
					<Image
						src={testimonialImage.imageUrl}
						alt={testimonialImage.attribution}
						width={0}
						height={0}
						sizes='100%'
						style={{ width: "100%", height: "auto", objectFit: "cover" }}
					/>
				</div>
				<div className='text-center'>
					<p className='font-medium'>{testimonialName}</p>
					<p className='text-secondary-text-color text-sm'>
						{testimonialDesignation}
					</p>
				</div>
			</div>

			<div className='flex flex-col gap-6 w-3/4'>
				<p className='text-secondary-color mx-auto'>
					<RiDoubleQuotesR size={24}/>
				</p>
				<p className='text-secondary-text-color'>
					{testimonialText}
				</p>
			</div>
		</section>
	);
}

export default TestimonialCard;
