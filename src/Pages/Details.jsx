import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { add } from '../Store/cartSlice';
import { GiShoppingCart } from 'react-icons/gi';

const Details = () => {

    const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const {id} = useParams()
  const product = items.find((p)=> p.id === parseInt(id))


  const localProducts = JSON.parse(localStorage.getItem("products")) || [];
  const fallBackProduct = localProducts.find((p)=> p.id === parseInt(id));


  const details = product || fallBackProduct;
  

  const addToCart = (product) => {
    dispatch(add(product));
  };
  
  if (!items || items.length === 0) {
    return <p>Loading products...</p>;
  }

  if (!details) {
    return <p>Product not found!</p>;
  }
  

  return (
    <div>

      <div className=" flex flex-col items-center bg-zinc-200 rounded-3xl w-full overflow-hidden">
            <div className='flex  gap-4 mt-6' >
            <img
              alt={details.title}
              src={details.images?.[1] || "https://via.placeholder.com/150"}
              className="aspect-square w-24 h-32 lg:w-60 lg:h-60 rounded-lg object-cover group-hover:opacity-75 xl:aspect-[7/8]"
            />
            <img
              alt={details.title}
              src={details.images?.[2] || "https://via.placeholder.com/150"}
              className="aspect-square w-24 h-32 lg:w-60 lg:h-60 md:w-32 md:h-32 rounded-lg object-cover group-hover:opacity-75 xl:aspect-[7/8]"
            />
            <img
              alt={details.title}
              src={details.images?.[0] || "https://via.placeholder.com/150"}
              className="aspect-square w-24 h-32 lg:w-60 lg:h-60 md:w-32 md:h-32 rounded-lg object-cover group-hover:opacity-75 xl:aspect-[7/8]"
            />
            </div>

            <div className=' flex flex-col items-center gap-5 ml-5 mr-5 mb-5'>
            <h3 className="mt-4 text-md text-zinc-900">
              {details.category?.name}
            </h3>
            
            <h3 className="mt-4 text-md font-medium text-zinc-900 tracking-wide">
              {details.title}
            </h3>

            <p className='lg:w-80 w-60 text-sm font-medium h-auto tracking-wide'>{details.description}</p>
            <p>
            <strong>Rating</strong>:⭐⭐⭐⭐⭐
            </p>
            
            <div className="flex items-center lg:gap-10 gap-5">
              <p className="flex justify-center p-2 rounded-full mt-2 text-md font-medium w-20 text-slate-200 bg-gray-900 tracking-wide">
                Price:${details.price}
              </p>
              <button
                className="tracking-wide flex items-center gap-2 justify-center p-2 text-lg bg-zinc-600 rounded-full lg:w-80 w-56 mt-3 text-white"
                onClick={() => addToCart(product)}
              >
                <GiShoppingCart />
                Add To Cart
              </button>
              
              </div>
            </div>
          </div>
     </div>
  )
}

export default Details
