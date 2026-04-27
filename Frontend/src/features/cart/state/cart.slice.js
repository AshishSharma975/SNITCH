import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[],
        totalPrice:0,
        totalItems:0,
    },
    reducers:{
        addToCart: (state,action) => {
            const {productId,variantId,quantity,price} = action.payload;
            state.items.push({productId,variantId,quantity,price});
            state.totalPrice += price * quantity;
            state.totalItems += quantity;
        },
        setCart: (state, action) => {
            state.items = action.payload.items;
            state.totalPrice = action.payload.totalPrice.amount;
            state.totalItems = action.payload.totalItems;
        }
    }
});

export const {addToCart, setCart} = cartSlice.actions;
export default cartSlice.reducer;