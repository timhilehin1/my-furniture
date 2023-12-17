import React from "react";
import PromoCard from "./PromoCard";

const dummyData = [
	{
		id: 1,
		title: "NEW PLANTS",
		subtitle: "Get up to 40% off",
		image: "/plants.png",
	},
	{
		id: 2,
		title: "CHAIN LAMP",
		subtitle: "Get up to 60% off",
		image: "/lamp.png",
		darkMode: true,
	},
	{
		id: 3,
		title: "NEW CHAIR",
		subtitle: "Get up to 40% off",
		image: "/sofa.png",
	},
];

function Discount() {
	return (
		<section className='p-4 mt-0 flex flex-col md:flex-row gap-4 justify-between'>
			{dummyData.map((data) =>
				data.darkMode ? (
					<PromoCard
						key={data.id}
						title={data.title}
						subtitle={data.subtitle}
						image={data.image}
						darkMode={data.darkMode}
					/>
				) : (
					<PromoCard
						key={data.id}
						title={data.title}
						subtitle={data.subtitle}
						image={data.image}
					/>
				)
			)}
		</section>
	);
}

export default Discount;
