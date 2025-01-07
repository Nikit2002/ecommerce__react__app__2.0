import React from 'react'
import { useContext } from 'react';
import Context from '../../context/Context';
import { IconContext } from "react-icons";
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import { useState } from 'react';
import { useEffect } from 'react';





const Header = () => {
  const values = useContext(Context);
  const cartValues = useContext(CartContext);

  useEffect(() => {
    cartValues.setTotalItems(localStorage.getItem('totalItems') ? 
    JSON.parse(localStorage.getItem('totalItems')) : 0)

    cartValues.setTotal(localStorage.getItem('total') ? 
    JSON.parse(localStorage.getItem('total')) : 0)

  }, [cartValues.totalItems, cartValues.total])

  return (
    <div className={styles.header__menu}>
    <IconContext.Provider value={{ color: "black", className: `${styles.cart__icon}` }}>
    <Link to='/'><values.HiHome /></Link>
    </IconContext.Provider>
    <IconContext.Provider value={{ color: "black", className: `${styles.cart__icon}` }}>
    <Link to='/cart'><values.HiOutlineShoppingCart /></Link>
    </IconContext.Provider>
    <p>Products in Cart: <span className={styles.header__total__items}>{cartValues.totalItems}</span></p>
    <span>Total: <span className={styles.header__total}>{cartValues.total}</span></span>
    </div>
    
  )
}

export default Header