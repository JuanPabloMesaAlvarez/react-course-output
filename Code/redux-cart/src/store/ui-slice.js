import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartVisible: false, notification: null };

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toogle(state) {
            state.cartVisible = !state.cartVisible;
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
});

export default uiSlice;
export const uiActions = uiSlice.actions;