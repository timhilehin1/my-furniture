import React from "react";
import { ServiceCardInterface } from "@/interfaces/serviceCard.interface";

function ServiceCard({ title, description, icon }: ServiceCardInterface) {
	return (
		<div className='border-2 border-[#e4e6e6] flex flex-col gap-6 items-center px-2 py-6 cursor-pointer'>
			<div className='flex items-center text-secondary-color gap-4'>
				{icon}
				<span className='text-[#2c2c2c] font-medium'>
					<p className='font-medium text-center'>{title}</p>
				</span>
			</div>
			<p className='text-center text-sm text-secondary-text-color'>
				{description}
			</p>
		</div>
	);
}

export default ServiceCard;
