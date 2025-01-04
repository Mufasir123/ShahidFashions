import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../Store/allProductsSlice';

const Category = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Extract unique categories from the items
  const categories = [...new Set(items.map((product) => product.category?.name))];

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    dispatch(setCategory(category)); // Dispatch the selected category to the Redux store
  };

  return (
    <div>
      <select
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="border-none outline-none bg-slate-200 p-2 text-lg font-normal rounded-xl"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;
