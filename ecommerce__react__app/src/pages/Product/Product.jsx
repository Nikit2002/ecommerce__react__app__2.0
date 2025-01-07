import React from 'react'
import styles from './Product.module.css'
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import Context from '../../context/Context';
import { useState } from 'react';
const Product = () => {
  const pdp = useLoaderData();
  const dispatch = useDispatch();
  const values = useContext(Context);
  const cartValues = useContext(CartContext);
  const [cartItems, setCartItems] = useState(localStorage.getItem('products') ? 
  JSON.parse(localStorage.getItem('products')) : []);
  
  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    console.log(cartValues);
    const sameProduct = cartItems.filter(cartItem => cartItem.id == product.id);
    values.setCartItem(product); 
    cartValues.setTotalItems(cartValues.totalItems + 1);
    cartValues.setTotal(Math.trunc(cartValues.total + (Math.trunc(product.price) * product.quantity)));
  }
  
  return (
    <section className={styles.pdp__page}>
      <div className={styles.pdp__return}>
        <Link to='/'>Return to products</Link>
      </div>
      <div className={styles.pdp__product}>
      <div className={styles.pdp__image__section}>
        <img src={pdp.image} alt="pdp__image" />
      </div>
      <div className={styles.pdp__info__section}>
        <h2>{pdp.title}</h2>
        <span className={styles.pdp__rating}>Rating: <span className={styles.pdp__rating__values}>{pdp.rating.rate}</span>  (People rated: <span className='pdp__rating__values'>{pdp.rating.count}</span>)</span>
        <span className={styles.pdp__price}>{pdp.price}</span>
        <p>{pdp.description}</p>
        <button className={styles.pdp__button} onClick={() => addToCartHandler(pdp)}>Add to Cart</button>
        <hr />
        <span className={styles.pdp__id}>Product ID: <span className={styles.pdp__id__values}>{pdp.id}</span></span>
        <p className={styles.pdp__category}>Category: <span className={styles.pdp__category__values}>{pdp.category}</span></p>
      </div>
      </div>
    </section>
  )
}

export default Product