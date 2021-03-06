import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [] };

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        loadProducts(state, action) {
            state.products = [...action.payload];
        }
    }
});

export default productsSlice;
export const productsActions = productsSlice.actions;