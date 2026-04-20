import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"product",
    initialState:{
        sellerproduct: []
    },
    reducers:{
        setsellerproduct:(state,action)=>{
            state.sellerproduct = action.payload
        }
    }
})

export const {setsellerproduct} = productSlice.actions
export default productSlice.reducer