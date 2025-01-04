import { NavLink } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../Store/cartSlice";
import FetchAllProducts from "./FetchAllProducts";
import { useEffect, useState } from "react";


const TrendingProducts = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const timer = setTimeout(()=>{
      setLoading(false)
    },3000);

    return () => clearTimeout(timer)
  }, [])
  

  const addToCart = (product) => {
    dispatch(add(product));
  };

  const limitItmes = items.slice(0, 6);
  return (
    <div>
      <FetchAllProducts />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <p className="text-xl font-semibold">Trending Products</p>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 text-slate-100">
          {loading ? Array.from({length:6}).map((_,index)=>(
          <div
          key={index}
          className="animate-pulse group bg-zinc-100 shadow-lg flex flex-col items-center justify-center p-3 rounded-lg"
        >
          <div className="aspect-square w-40 h-40 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="flex items-center gap-10">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="flex items-center gap-2 h-4 bg-gray-200 rounded w-4/5 mb-4"></div>
          </div>
        </div>
        )):limitItmes.map((product) => (
            <NavLink
              key={product.id}
              className="group bg-zinc-100 shadow-lg flex flex-col items-center justify-center p-3 rounded-lg"
            >
              <NavLink to={`/products/${product.id}`}>
              <img
                alt={product.title}
                src={product.images?.[1] || "https://via.placeholder.com/150"}
                className="aspect-square w-40 h-50 rounded-lg object-cover group-hover:opacity-75 xl:aspect-[7/8]"
              />
              </NavLink>
              <h3 className="mt-4 text-md text-zinc-900">
                {product.category?.name}
              </h3>
              <NavLink to={`/products/${product.id}`}>
              <h3 className="mt-4 text-md font-medium text-zinc-900">
                {product.title}
              </h3>
              </NavLink>
              <div className="flex items-center gap-10">
                <p className="mt-2 text-md font-medium text-gray-900">
                  ${product.price}
                </p>
                <button
                  className="flex items-center gap-2 text-sm bg-zinc-600 rounded-full w-15 p-2 mt-3 text-white"
                  onClick={() => addToCart(product)}
                >
                  <GiShoppingCart />
                  Add to Cart
                </button>
              </div>
            </NavLink>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default TrendingProducts;
