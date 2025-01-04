import React, { useState } from 'react'
import { GiShoppingCart } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { remove, updateQuantity } from '../Store/cartSlice'

const Cart = () => {

  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const removeFromCart=(id)=>{
    dispatch(remove(id));
    setQuantities((prevQuantity)=>{
      const updatedQuantities = {...prevQuantity};
      delete updatedQuantities[id];
      return updatedQuantities;
    })
  }

// handle increment and decrement 
  const [quantities, setQuantities] = useState(
    cartProducts.reduce((acc, product) => {
      acc[product.id] = 1; // Initialize quantity as 1 for each product
      return acc;// Accumulator is container which stores the data that we want to increment and decrement and give final result to reducer
    }, {})
  );

  const handleIncrement = (id)=>{
    const newQuantity = quantities[id] + 1;
    setQuantities((prevQuantities)=>({
      ...prevQuantities, [id]:newQuantity,
    })),
    dispatch(updateQuantity({id, quantity:newQuantity}))
    
  }

  const handleDecrement = (id)=>{
    const newQuantity = Math.max(1, quantities[id]-1);
    setQuantities((prevQuantities)=>({
      ...prevQuantities,
      [id]:newQuantity,
    }))
    dispatch(updateQuantity({id, quantity:newQuantity}))
  }


  const handleBuyNow = ()=>{
    const totalAmount = cartProducts.reduce(
      (acc, product)=> acc + product.price * quantities[product.id],0)
      navigate('/checkout', {state:{totalAmount, cartProducts}})
  }


  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <p className='text-xl font-semibold'>Cart Items</p>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 text-slate-100">
          {cartProducts.length === 0 ? (
            <div className="mt-10 text-center">
            <p className="text-lg font-medium text-gray-500">Your cart is empty.</p>
            <NavLink to="/products">
              <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
                Continue Shopping
              </button>
            </NavLink>
          </div>
          ): (cartProducts.map((product) => (
            <NavLink key={product.id}  className="group bg-zinc-100 shadow-lg flex flex-col items-center justify-center p-3 rounded-lg">
              <NavLink to={`/products/${product.id}`}>
              <img
                alt={product.title}
                src={product.images?.[1] || 'https://via.placeholder.com/150'}
                className="aspect-square w-40 h-50 rounded-lg object-cover group-hover:opacity-75 xl:aspect-[7/8]"
              />
              </NavLink>
              <h3 className="mt-4 text-md text-zinc-900">{product.category?.name}</h3>

              <NavLink to={`/products/${product.id}`}>
              <h3 className="mt-4 text-md font-medium text-zinc-900">{product.title}</h3>
              </NavLink>
              <div className="flex items-center gap-4 mt-2">
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() => handleDecrement(product.id)}
                >
                  -
                </button>
                <span className="text-lg">{quantities[product.id]}</span>
                <button
                  className="px-2 py-1 bg-gray-300 rounded"
                  onClick={() => handleIncrement(product.id)}
                >
                  +
                </button>
              </div>
              <div className='flex items-center gap-10'>
              <p className="mt-2 text-md font-medium text-gray-900">${product.price * quantities[product.id]}</p>
              <button className='flex items-center gap-2 text-sm bg-zinc-600 rounded-full w-15 p-2 mt-3 text-white'
              
              onClick={()=> removeFromCart(product.id)}
              >
              <GiShoppingCart />
                Remove Items
                </button>
              </div>
            </NavLink>
          )))}
        </div>
        {cartProducts.length > 0 && (
          <div className="mt-10">
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
