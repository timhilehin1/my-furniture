import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInterface } from "@/interfaces/product.interface";
const initialState: ProductInterface[] = [];

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
        addToWishlist: (state, action: PayloadAction<ProductInterface>) => {
            const product = action.payload;
            const productExists = state.find((item) => item._id === product._id);
            if (!productExists) {
                state.push(product);
            }
        },
        removeFromWishlist: (state, action: PayloadAction<ProductInterface>) => {
            const product = action.payload;
            const index = state.findIndex((item) => item._id === product._id);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },

    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
