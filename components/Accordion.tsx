"use client";
import React, { useState } from "react";
import {
	AccordionDetails,
	Accordion,
	AccordionSummary,
	Typography,
} from "@mui/material";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
interface AccordionComponentProps {
    children: React.ReactNode;
    title: string;
  }
function AccordionComponent({ children,title }: AccordionComponentProps) {
	const [expanded, setExpanded] = useState(false);
	return (
		<Accordion
			disableGutters={true}
			className='mt-4'
			onChange={() => setExpanded(!expanded)}
			sx={{
				color: "#fff",
				boxShadow: "none",
				border: "none",
				backgroundColor: "#fff",
			}}
		>
			<AccordionSummary
				expandIcon={
					expanded ? (
						<AiOutlineMinus style={{ color: "#000" }} size={18} />
					) : (
						<AiOutlinePlus style={{ color: "#000" }} size={18} />
					)
				}
				aria-controls='accordion-content'
				id='accordion-header'
			>
				<Typography sx={{ color: "#000", border: "none", fontSize:'1rem' }}>{title}</Typography>
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</Accordion>
	);
}

export default AccordionComponent;
