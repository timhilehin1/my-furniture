import React from "react";
import Image from "next/image";
function Gallery() {
	return (
		<section className='mt-12 p-4'>
			<header className='font-semibold text-base mt-4 md:text-3xl text-center'>
				Gram Gallery
			</header>

			<main className='grid grid-cols-3 semiLarge:flex semiLarge:flex-row semiLarge:justify-between px-4 gap-4 mt-8'>
				<Image
					src={"/gallery1.png"}
					alt='new arrival image'
					width={0}
					height={0}
					sizes='100%'
					style={{ width: "100%", height: "auto" }}
				/>
				<Image
					src={"/gallery2.png"}
					alt='new arrival image'
					width={0}
					height={0}
					sizes='100%'
					style={{ width: "100%", height: "auto" }}
				/>
				<Image
					src={"/gallery3.png"}
					alt='new arrival image'
					width={0}
					height={0}
					sizes='100%'
					style={{ width: "100%", height: "auto" }}
				/>
				<Image
					src={"/gallery4.png"}
					alt='new arrival image'
					width={0}
					height={0}
					sizes='100%'
					style={{ width: "100%", height: "auto" }}
				/>
				
			</main>
		</section>
	);
}

export default Gallery;
