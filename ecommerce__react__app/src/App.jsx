import { useEffect } from 'react'
import { useState } from 'react'
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider
} from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Error from './pages/Error/Error';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiHome } from "react-icons/hi2";
import Context from './context/Context';
import { useContext } from 'react';
import ProductsContext from './context/ProductsContext';
import { useSelector } from 'react-redux';
import { useSelectProducts } from './store/slices/productSlice';
import CartContext from './context/CartContext';


function App({routes}) {

  const Root = () => {
    return (
        <div className='container'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

const products = useSelector(useSelectProducts);
const [filteredProducts, setFilteredProducts] = useState([]);
const [totalItems, setTotalItems] = useState(localStorage.getItem('totalItems') ? 
JSON.parse(localStorage.getItem('totalItems')) : 0);
const [total, setTotal] = useState(localStorage.getItem('total') ? 
JSON.parse(localStorage.getItem('total')) : 0);

const [cartItem, setCartItem] = useState({});
const [handler, setHandler] = useState({});

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<Root/>}>
          <Route index element={<Homepage/>}/>
          <Route path='/cart' element={<Cart products={products}/>} />
          <Route path='/product/:id' loader={productLoader} element={<Product/>} errorElement={<Error />}/>
          <Route path='*' element={<Error/>} />
      </Route>
  )
)




const values = {
  HiOutlineShoppingCart,
  HiHome,
  cartItem,
  setCartItem,
  handler,
  setHandler
}

const productsValues = {
  products,
  filteredProducts,
  setFilteredProducts
}

const cartValues = {
  totalItems, 
  total,
  setTotalItems,
  setTotal
}


  return (
    <>
    <CartContext.Provider value={cartValues}>
    <ProductsContext.Provider value={productsValues}>
      <Context.Provider value={values}>
      <RouterProvider router={router} />
      </Context.Provider>
    </ProductsContext.Provider>
    </CartContext.Provider>
    </>
  )
}

async function productLoader({params}) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product = await res.json();
  return product;
}
export default App
