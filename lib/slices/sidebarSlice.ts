import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
	SidebarStatus: false,
};

const sidebarSlice = createSlice({
	name: "sidebar",
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.SidebarStatus = !state.SidebarStatus;
		},
	},
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;