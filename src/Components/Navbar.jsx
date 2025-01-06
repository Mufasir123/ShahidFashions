import {  NavLink } from 'react-router-dom'
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartProduct = useSelector((state)=> state.cart)

  return (
    <div>
      <div className='z-10 mt-[-80px] bg-slate-600 h-14 md:h-16 pt-2 shadow-xl w-full lg:h-16 lg:pt-2 fixed'>
        <nav className='flex justify-between items-center '>
            <NavLink to='/'><p className='text-white pl-5' >Shahid Fashions</p></NavLink>
            <ul className='flex gap-4 items-center bg-slate-100 rounded-full max-w-full shadow-lg p-2 md:p-3'>
                <NavLink to='/'><li>Home</li></NavLink>
                <NavLink to='/products'><li>Products</li> </NavLink>
            </ul>
            <div className='flex items-center text-white pr-4 gap-5'>
            {/* <Cart/> */}

            <div className="flex items-center">
            <NavLink to='/cart' className="text-4xl"><GiShoppingCart/> </NavLink>
            <p className='flex items-center justify-center bg-white text-red-800 rounded-full w-5 absolute mb-5 ml-4'>{cartProduct.length}</p>
            </div>
            {/* <NavLink to="/signup">Signup/Login</NavLink> */}
            </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
