import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
// import RootLayout from './Layout/RootLayout'
// import Products from './Pages/Products'
// import Cart from './Pages/Cart'
// import Signup from './Components/Signup'
// import Home from './Pages/Home'
// import Details from './Pages/Details'
// import Checkout from './Components/CheckOut'
import { Suspense, lazy } from 'react'



// Lazy load components
const RootLayout = lazy(() => import('./Layout/RootLayout'))
const Home = lazy(() => import('./Pages/Home'))
const Products = lazy(() => import('./Pages/Products'))
const Cart = lazy(() => import('./Pages/Cart'))
const Signup = lazy(() => import('./Components/Signup'))
const Details = lazy(() => import('./Pages/Details'))
const Checkout = lazy(() => import('./Components/CheckOut'))




function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Home/>} />
        <Route path='cart' element={<Cart/>}/>   
        <Route path='checkout' element={<Checkout/>}/>
        <Route path='signup' element={<Signup/>} />
        <Route path='products' element={<Products/>} />
        <Route path='/products/:id' element={<Details/>} />

      </Route>
    )
  )
  return (
    <Suspense fallback={
    <div className='flex items-center justify-center mt-56 text-4xl font-semibold'>Loading.....</div>
    }>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
