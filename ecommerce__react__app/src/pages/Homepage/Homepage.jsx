import React from 'react'
import styles from './Homepage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, useSelectProducts, useSelectProductsStatus } from '../../store/slices/productSlice';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { TailSpin } from "react-loader-spinner";
import { useState } from 'react';
import AdvancedSearch from '../../components/AdvancedSearch/AdvancedSearch';
import Filter from '../../components/Filter/Filter';
import { useContext } from 'react';
import Context from '../../context/Context';
import ProductsContext from '../../context/ProductsContext';
import { addToCart } from '../../store/slices/cartSlice';
import CartContext from '../../context/CartContext';
import './Homepage.css';


export const Homepage = () => {
  const dispatch = useDispatch();
  const productStatus = useSelector(useSelectProductsStatus);
  const values = useContext(Context);
  const productsValues = useContext(ProductsContext);
  const cartValues = useContext(CartContext);
  const [cartItems, setCartItems] = useState(localStorage.getItem('products') ? 
  JSON.parse(localStorage.getItem('products')) : []);
  

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts())
    }
  }, [productStatus, dispatch]);

  if (productStatus === 'loading') return <TailSpin
  visible={true}
  height="80"
  width="80"
  color="#000"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{
    transform: "translate(50%, 0%)"
  }}
  wrapperClass=""
  />

   

  console.log(productsValues.filteredProducts);
  
  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    console.log(cartValues);
    const sameProduct = cartItems.filter(cartItem => cartItem.id == product.id);
    values.setCartItem(product); 
    cartValues.setTotalItems(cartValues.totalItems + 1);
    cartValues.setTotal(Math.trunc(cartValues.total + (Math.trunc(product.price) * product.quantity)));
  }

  
  
  
  

  return (
    <section>
      {productsValues.products ? 
      <>
      <AdvancedSearch addToCartHandler={addToCartHandler}/>
      <Filter filteredProducts={productsValues.filteredProducts} 
      setFilteredProducts={productsValues.setFilteredProducts}
      />
      <div className={`products-container ${productsValues.filteredProducts.length != 0 ? 'none' : ''}`}>
        {productsValues.products.map(product => {
          return (
          <div className={styles.product} key={product.id}>
            <img src={product.image} alt="product-image" />
            <h2><Link to={`/product/${product.id}`}>{product.title}</Link></h2>
            <p>Rating: {product.rating.rate} <br /> (people rated:{product.rating.count})</p>
            <span>{Math.trunc(product.price)}</span>
            <button className={styles.product__button} onClick={() => addToCartHandler(product)}>Add to Cart</button>
        </div>)})}
      </div>
      </> : <h2>Failed to load products. Please try again later...</h2>}
      {productsValues.filteredProducts.length != 0 ? <div className={`products-container ${productsValues.filteredProducts.length != 0 ? '' : 'none'}`}>
        {productsValues.filteredProducts.map(filteredProduct => {
          return (
          <div className={styles.product} key={filteredProduct.id}>
            <img src={filteredProduct.image} alt="product-image" />
            <h2><Link to={`/product/${filteredProduct.id}`}>{filteredProduct.title}</Link></h2>
            <p>Rating: {filteredProduct.rating.rate} <br /> (people rated:{filteredProduct.rating.count})</p>
            <span>{Math.trunc(filteredProduct.price)}</span>
            <button className={styles.product__button} onClick={() => addToCartHandler(filteredProduct)}>Add to Cart</button>
        </div>)})}
      </div> : null}
    </section>
  )
}

export default Homepage