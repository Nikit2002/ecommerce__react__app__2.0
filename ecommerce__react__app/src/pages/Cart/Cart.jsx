import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ModalWind from '../../components/Modal/ModalWind';
import CartContext from '../../context/CartContext';
import Context from '../../context/Context';
import { increaseCart, decreaseCart, removeCartItem, removeFromCart, resetCart } from '../../store/slices/cartSlice';
import styles from './Cart.module.css'

 const Cart = () => {
  const [cartItems, setCartItems] = useState(localStorage.getItem('products') ? 
  JSON.parse(localStorage.getItem('products')) : []);

  const [cartNumbers, setCartNumbers] = useState(localStorage.getItem('cartNumber') ? 
  JSON.parse(localStorage.getItem('cartNumber')) : 0);

  const dispatch = useDispatch();
  const cartItemRemove = useSelector(removeCartItem);
  const cartValues = useContext(CartContext);
  const [isModal, setIsModal] = useState(false);

  const [localstorageQuantity, setLocalstorageQuantity] = useState(localStorage.getItem('products') ? JSON.parse((localStorage.getItem('products'))) : 0); 
  const [localstoragePrice, setLocalstoragePrice] = useState(localStorage.getItem('products') ? JSON.parse((localStorage.getItem('products'))) : 0); 
  
  const values = useContext(Context);
  
  
  const [itemQuantity, setItemQuantity] = useState(localStorage.getItem('products') ? values.cartItem.quantity : 0);
  const [itemPrice, setItemPrice] = useState(localStorage.getItem('products') ? values.cartItem.price * values.cartItem.quantity : 0);
  console.log(itemQuantity);
  console.log(itemPrice);

  

  const increaseCartHandler = (cartItem) => {
    const basePrice = cartItem.price;
    dispatch(increaseCart(cartItem));
    setItemQuantity(cartItem.quantity + 1);
    setItemPrice(cartItem.price = basePrice / cartItem.quantity);
    cartValues.setTotal(cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0));
  }

  const decreaseCartHandler = (cartItem) => {
    const basePrice = cartItem.price;
    dispatch(decreaseCart(cartItem));
    setItemPrice(cartItem.price -= basePrice);
    cartValues.setTotalItems(cartValues.totalItems - 1);
    setItemQuantity(cartItem.quantity - 1);
    cartValues.setTotal(cartValues.total - (cartItem.price * cartItem.quantity));
    if (cartItem.quantity == 0) {
      setCartItems(cartItems.filter(item => item != cartItem));
    }
  }

  const removeCartHandler = (cartItem) => {
    setIsModal(true);
    values.setCartItem(cartItem);
    dispatch(removeFromCart(cartItem));
    setCartItems(cartItems.filter(item => item != cartItem));
    cartValues.setTotal(cartValues.total - (cartItem.price * cartItem.quantity));
    cartValues.setTotalItems(cartValues.totalItems - cartItem.quantity);
  }
  
  const resetCartHandler = () => {
    dispatch(resetCart());
    setCartItems([]);
    cartValues.setTotal(0);
    cartValues.setTotalItems(0);
  }

  return (
    <>
    {cartItems.length != 0 ? <> <ModalWind call={isModal} setIsModal={setIsModal} removeItem={removeCartHandler} cartItem={values.cartItem}/>
      <table>
        <tbody>
        <tr>
          <th>№</th>
          <th>Product image</th>
          <th>Product name</th>
          <th>Product quantity</th>
          <th>Product price</th>
        </tr>
        {cartItems.map(cartItem => { 
        return (
        <tr key={cartItem.numberInCart}>
          <td>{cartItem.numberInCart}</td>
          <td><img src={cartItem.image} className={styles.cart__image} alt="cart__image" /></td>
          <td><h4 className={styles.cart__title}>{cartItem.title}</h4></td>
          <td> 
            <div className={styles.quantity}>
              <button className={styles.cart__button} onClick={() => decreaseCartHandler(cartItem)}>-</button>
              <span className={styles.cartItem__span}>{cartItem.quantity}</span>
              <button className={styles.cart__button} onClick={() => increaseCartHandler(cartItem)}>+</button>
            </div>
          </td>
          <td> <span className={styles.cartItem__span}>{Math.trunc(cartItem.price * cartItem.quantity)}</span></td>
          <td><button className={styles.cart__button} onClick={() => removeCartHandler(cartItem)}>X</button></td>
        </tr>)})}
        <tr>
          <td></td>
          <td></td>
          <td><button className={styles.cart__button} onClick={() => resetCartHandler()}>Reset Cart</button></td>
          <td><span className={styles.total__quantity}>Total quantity: {cartValues.totalItems}</span></td>
          <td><span className={styles.total}>Total: {Math.trunc(cartValues.total)}</span></td>
        </tr>
        </tbody>
      </table>
      </> : <> <h2>Your cart is empty...</h2>
      <Link to="/"><button>Return to products</button></Link> </> } </>
  )
}



export default Cart;
