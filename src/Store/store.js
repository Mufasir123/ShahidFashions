import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice.js'
import allProductsSlice from './allProductsSlice.js'

const store = configureStore(
    {
        reducer:{
            cart:cartSlice,
            products:allProductsSlice,
    }
}
)

export default store;