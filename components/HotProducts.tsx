import React from "react";
import Image from "next/image";
interface Props {
	value: number;
	index: number;
}

function HotProducts({ value, index }: Props) {
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`Hot-products-tabpanel`}
			aria-labelledby={`Hot-products-tab`}
		>
			{value === index && (
				<>
					{/* //desktop view */}
					<main className='hidden semiLarge:grid semiLarge:grid-cols-3 gap-4'>
						<div className='grid grid-cols-2 gap-6'>
							<Image
								src={"/item1.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
							<Image
								src={"/item3.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>

							<Image
								src={"/item1.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
							<Image
								src={"/item3.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
						</div>
						<div>
							<Image
								src={"/catch.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
						</div>
						<div className='grid grid-cols-2 gap-6'>
							<Image
								src={"/item4.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
							<Image
								src={"/item2.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>

							<Image
								src={"/item4.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
							<Image
								src={"/item2.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
						</div>
					</main>
					{/* mobile view */}
					<main className='flex flex-col gap-6  semiLarge:hidden'>
						<div>
							<Image
								src={"/catch.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
						</div>

						<div className='grid grid-cols-2 gap-6'>
							<Image
								src={"/item1.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
							<Image
								src={"/item3.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>

							<Image
								src={"/item1.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
							<Image
								src={"/item3.png"}
								alt='image'
								width={0}
								height={0}
								sizes='100%'
								style={{ width: "100%", height: "auto" }}
							/>
						</div>
					</main>
				</>
			)}
		</div>
	);
}

export default HotProducts;
