import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"product",
    initialState:{
        sellerproduct: [],
        allproduct: [],
    },
    reducers:{
        setsellerproduct:(state,action)=>{
            state.sellerproduct = action.payload
        },
        setallproduct:(state,action)=>{
            state.allproduct = action.payload
        }
    }
})

export const {setsellerproduct,setallproduct} = productSlice.actions
export default productSlice.reducer