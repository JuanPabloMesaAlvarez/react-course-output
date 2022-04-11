import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./cart-slice";
import productsSlice from "./products-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        products: productsSlice.reducer,
        ui: uiSlice.reducer
    }
});

export default store;