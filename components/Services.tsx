import React from "react";
import ServiceCard from "./ServiceCard";
import { RxRocket } from "react-icons/rx";
import { TbTruckReturn } from "react-icons/tb";
import { FaMoneyCheck } from "react-icons/fa6";
import { RiSecurePaymentLine } from "react-icons/ri";

const dummyData = [
	{
		id: 1,
		title: "Free Shipping",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
		icon: <RxRocket size={24} />,
	},
	{
		id: 2,
		title: "Return Policy",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
		icon: <TbTruckReturn size={24} />,
	},
	{
		id: 3,
		title: "Payment Secured",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
		icon: <RiSecurePaymentLine size={24} />,
	},
	{
		id: 4,
		title: "Money Back Guarantee",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
		icon: <FaMoneyCheck size={24} />,
	},
];

function Services() {
	return (
		<section className='p-4 mt-8 flex flex-col md:flex-row semiLarge:grid semiLarge:grid-cols-2 lg:flex gap-4 justify-between'>
			{dummyData.map((data) => (
				<ServiceCard
					key={data.id}
					title={data.title}
					description={data.description}
					icon={data.icon}
				/>
			))}
		</section>
	);
}

export default Services;
