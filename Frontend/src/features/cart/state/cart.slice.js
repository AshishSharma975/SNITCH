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
            state.totalPrice = action.payload.items.reduce(
                (sum, item) => sum + (item.price?.amount || 0) * (item.quantity || 1), 0
            );
            state.totalItems = action.payload.items.reduce(
                (sum, item) => sum + (item.quantity || 1), 0
            );
        },
        incrementItemQuantity: (state,action) => {
            const {productId,variantId} = action.payload;
            const item = state.items.find(item => item.productId.toString() === productId && item.variantId.toString() === variantId);
            if(item){
                item.quantity += 1;
                state.totalPrice += item.price.amount;
                state.totalItems += 1;
            }
        },
        decrementItemQuantity: (state,action) => {
            const {productId,variantId} = action.payload;
            const item = state.items.find(item => item.productId.toString() === productId && item.variantId.toString() === variantId);
            if(item){
                item.quantity -= 1;
                state.totalPrice -= item.price.amount;
                state.totalItems -= 1;
            }
        },
        removeItem: (state,action) => {
            const {productId,variantId} = action.payload;
            const item = state.items.find(item => item.productId.toString() === productId && item.variantId.toString() === variantId);
            if(item){
                state.totalPrice -= item.price.amount * item.quantity;
                state.totalItems -= item.quantity;
                state.items = state.items.filter(item => item.productId.toString() !== productId || item.variantId.toString() !== variantId);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
            state.totalItems = 0;
        }
    }
});

export const {addToCart, setCart, incrementItemQuantity, decrementItemQuantity, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;