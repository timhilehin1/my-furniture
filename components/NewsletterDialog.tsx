"use client";
import React, { useState, useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function NewsletterDialog() {
	const [open, setOpen] = useState(false);
	const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md");

	useEffect(() => {
		const timer = setTimeout(() => {
			handleClickOpen();
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	const handleClickOpen = () => {
		// console.log("opennn");
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby='alert-dialog-slide-description'
				maxWidth={maxWidth}
				fullWidth={true}
			>
				<DialogContent
					sx={{
						display: "flex",
						flexDirection: "row",
						gap: "1rem",
						padding: "0",
						justifyContent: "space-between",
						borderRadius: "0",
					}}
				>
					<div className='w-2/4 hidden md:block'>
						<Image
							src={"/newsletter_image.png"}
							alt='News Letter image'
							width={0}
							height={0}
							sizes='100vw'
							style={{ width: "100%", height: "auto" }}
						/>
					</div>

					<section className='flex flex-col py-16 md:py-0 justify-center items-center gap-4 px-4 w-full md:w-2/4'>
						<p className='font-black md:text-lg text-xs text-left'>
							NEWSLETTER
						</p>
						<p className='text-xs text-secondary-text-color'>
							Get 15% off your first purchase! Plus, be the first to know about
							sales, new product launches and exclusive offers!
						</p>
						<input
							className='w-full py-2 px-2 border-solid text-sm  border-2 border-[#0a5d5d] focus:border-[#0a5d5d] focus:outline-none placeholder:italic placeholder:text-sm rounded'
							type='text'
							placeholder='Enter your email address'
						/>
						<button className="p-2.5 rounded w-full text-primary-color bg-[#0a5d5d]">Submit</button>
						<div className='flex justify-center mt-8  gap-4'>
						<input className=" accent-[#0a5d5d]" type='checkbox' />
						<label className='text-xs text-secondary-text-color'>
							DON'T SHOW THIS POPUP AGAIN
						</label>
						</div>
					</section>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default NewsletterDialog;
