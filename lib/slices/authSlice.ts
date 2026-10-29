import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
}

const initialState: AuthState = {
	accessToken: null,
	refreshToken: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setTokens: (
			state,
			action: PayloadAction<{ accessToken: string; refreshToken: string }>
		) => {
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
		},
		logout: () => initialState,
	},
});

export const { setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
