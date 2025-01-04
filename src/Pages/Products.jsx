import React, { useEffect, useMemo, useState } from 'react'
import { GiShoppingCart } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { add } from '../Store/cartSlice';
import FetchAllProducts from '../Components/FetchAllProducts';
import Category from '../Components/Category';
import { setSearchItems } from '../Store/allProductsSlice';

const Products = () => {

  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const selectedCategory = useSelector((state)=> state.products.selectedCategory)
  const searchItems = useSelector((state)=> state.products.searchItems);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const itemsPerPage = 9; 

  useEffect(() => {
    const timer = setTimeout(()=>{
      setLoading(false);
    },2000);
  
    return () => clearTimeout(timer)
  }, [])
  

 // handle search items 
 const filteredProducts = useMemo(() => {
  return (items || [])
    .filter(
      (product) =>
        selectedCategory === "" || product.category?.name === selectedCategory
    )
    .filter((product) =>
      product.title.toLowerCase().includes(searchItems.toLowerCase())
    );
}, [items, selectedCategory, searchItems]);

  const handleSearch = (e)=>{
    dispatch(setSearchItems(e.target.value))
  }
  

  const addToCart = (product) => {
    dispatch(add(product));
  };

  const limitedProducts = currentProducts.slice(0,90)


  
   // Pagination
   useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    setCurrentProducts(paginatedProducts);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

   const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

  return (
    <div>
    <FetchAllProducts />
    <div className="lg:ml-24 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

      <div className='flex justify-between ml-3 mr-3 text-xl font-semibold'>
      <p className="text-xl font-semibold">All Products</p>
      <input
            type="text"
            placeholder="Search products"
            className="pl-5 w-44 border-solid bg-black shadow-md rounded-full text-lg text-white outline-none font-normal"
            onChange={handleSearch}
            value={searchItems}
          />
      <Category/>
      </div>


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
        )): limitedProducts.map((product) => (
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
      <div className="mt-6 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
    </div>
  </div>
  )
}

export default Products;
