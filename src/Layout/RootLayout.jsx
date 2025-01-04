import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer';

const RootLayout = () => {
  
    const [showLogin,setShowLogin] = useState(false);
  return (
    <div>
      <Navbar/>
      {showLogin && <Login/>}
      <div className='mt-20'>
      <Outlet/>
      </div>
      <Footer/>

    </div>
  )
}

export default RootLayout
