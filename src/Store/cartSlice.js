import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        add(state, action){
            state.push(action.payload)
        },
        remove(state, action){
            return state.filter(item => item.id !== action.payload)
        },
        updateQuantity(state, action){
            const {id, quantity} = action.payload
            const product = state.find((item)=> item.id === id);
            if(product){
                product.quantity = quantity;
            }
        }
    }
    
})


export const {add, remove, updateQuantity} = cartSlice.actions;

export default cartSlice.reducer;