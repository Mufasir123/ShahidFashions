import { createSlice } from "@reduxjs/toolkit";

const arrayProduct = {
    items:JSON.parse(localStorage.getItem("products"))|| [],
    selectedCategory: '',
    searchItems:'',
}
const allProductsSlice = createSlice({
    name:"AllProducts",
    initialState:arrayProduct,
    reducers:{
        fetchAllProducts:(state, action)=>{
            state.items=action.payload;
            localStorage.setItem("products",JSON.stringify(action.payload))
        },
        setCategory(state, action){
            state.selectedCategory= action.payload
        },
        setSearchItems(state, action){
            state.searchItems= action.payload;
        }
    }
})
export const {fetchAllProducts, setCategory, setSearchItems} = allProductsSlice.actions;
export default allProductsSlice.reducer;