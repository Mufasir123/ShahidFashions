import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../Store/allProductsSlice';

const FetchAllProducts = () => {

    const dispatch = useDispatch();
    const items = useSelector((state)=> state.products.items);
    

  useEffect(() => {
    if(items.length === 0 ){
       fetch("https://api.escuelajs.co/api/v1/products")
       .then((res)=> res.json())
       .then((data)=>{
        dispatch(fetchAllProducts(data))
       })

       .catch((error)=>{
        console.error("Error while fetching products", error)
       })
    } 
  }, [dispatch, items.length]);

  
    
  return (
    <div>
      
    </div>
  )
}

export default FetchAllProducts
