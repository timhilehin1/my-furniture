import React from "react";
import Image from "next/image";

function Discovery() {
	return (
		<section className='mt-8 p-4 flex w-full gap-8 flex-col semiLarge:flex-row'>
			<Image
				src={"/important1.png"}
				alt='new arrival image'
				width={0}
				height={0}
				sizes='100%'
				style={{ width: "100%", height: "auto" }}
			/>
			<Image
				src={"/important2.png"}
				alt='new arrival image'
				width={0}
				height={0}
				sizes='100%'
				style={{ width: "100%", height: "auto" }}
			/>
		</section>
	);
}

export default Discovery;
