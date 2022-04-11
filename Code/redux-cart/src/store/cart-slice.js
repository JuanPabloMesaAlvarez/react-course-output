import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'

const initialState = { changed: false, id: uuidv4(), items: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const existingItemIndex = state.items.findIndex(item => item.title === action.payload.title);
            if (existingItemIndex === -1) {
                state.items.push({ ...action.payload, total: action.payload.price, quantity: 1 });
                return;
            }

            const existingItem = state.items[existingItemIndex];
            const quantity = existingItem.quantity + 1;
            const total = quantity * existingItem.price;
            state.items[existingItemIndex] = { ...state.items[existingItemIndex], quantity: quantity, total: total };
            state.changed = true;

        },
        removeItem(state, action) {
            const existingItemIndex = state.items.findIndex(item => item.title === action.payload.title);
            if (existingItemIndex === -1) {
                return;
            }
            const existingItem = state.items[existingItemIndex];
            const quantity = existingItem.quantity - 1;
            if (quantity <= 0) {
                state.items.splice(existingItemIndex, 1)
                return;
            }

            const total = quantity * existingItem.price;
            state.items[existingItemIndex] = { ...state.items[existingItemIndex], quantity: quantity, total: total };
            state.changed = true;
        },
        setCart(state, action) {
            state.id = action.payload.id;
            state.items = [...action.payload.items];
            state.changed = false;
        }
    }
});

export default cartSlice;
export const cartActions = cartSlice.actions;