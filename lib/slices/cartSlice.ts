import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartInterface } from "@/interfaces/cart.interface";
import { ProductInterface } from "@/interfaces/product.interface";
const initialState: ProductInterface[] = [];

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<ProductInterface>) => {
			const product = action.payload;
			const productExists = state.find((item) => item._id === product._id);
			if (!productExists) {
				state.push(product);
			}
		},
		removeFromCart: (state, action: PayloadAction<ProductInterface>) => {
			const product = action.payload;
			const index = state.findIndex((item) => item._id === product._id);
			if (index !== -1) {
				state.splice(index, 1);
			}
		},

		// increaseQuantity: (state, action: PayloadAction<ProductInterface>) => {
		// 	const product = action.payload;
		// 	const productExists = state.find((item) => item._id === product._id);
		// 	if (productExists) {
		// 		productExists.productQuantity++;
		// 	}
		// },
		// decreaseQuantity: (state, action: PayloadAction<cartInterface>) => {
		// 	const product = action.payload;
		// 	const productExists = state.find((item) => item._id === product._id);
		// 	if (productExists) {
		// 		productExists.productQuantity--;
		// 	}
		// },
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
