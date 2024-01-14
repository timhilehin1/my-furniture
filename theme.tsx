"use client";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { Jost } from "next/font/google";
const JostFont = Jost({ subsets: ["latin"] });
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	// Set Material UI Theme
	const theme = createTheme({
		typography: {
			fontFamily: JostFont.style.fontFamily,
		},
	});

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
