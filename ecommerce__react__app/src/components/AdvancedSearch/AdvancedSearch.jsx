import React from 'react'
import styles from './AdvancedSearch.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const AdvancedSearch = ({addToCartHandler}) => {
  const [query, setQuery] = useState("");
  const [productsForSearch, setProductsForSearch] = useState([{}]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setProductsForSearch(json))
  }, [productsForSearch]);

  const search_parameters = Object.keys(Object.assign({}, ...productsForSearch));

  function search(productsForSearch) {

    return productsForSearch.filter((searchedProduct) =>
      search_parameters.some((parameter) =>
      searchedProduct[parameter].toString().toLowerCase().includes(query)

      )

    );

  }

  return (
    <div className={styles.advanced__search__box}>

        <input
          type="search"
          className={styles.advanced__search__input}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type something to search products"
        />
        <div className={`advanced__search__data ${query ? '' : 'none'}`}>
            <div className={styles.box__titles}>
              <div className={styles.card__titles}>
                  <span className={styles.card__titles__image}>Product Image</span>
                  <span className={styles.card__titles__title}>Product Title</span>
                  <span className={styles.card__titles__rating}>Product Rating</span>
                  <span className={styles.card__titles__price}>Product Price</span>
                  <span className={styles.card__titles__addToCart}>Add to Cart</span>
                </div>
              </div>
        {search(productsForSearch).map((searchEl) => {
            return (
              <div className={styles.box} key={searchEl.id}>
                <div className={styles.card}>
                  <img className={styles.card__img} src={searchEl.image}></img>
                  <Link to={`/product/${searchEl.id}`}><h4 className={styles.card__title}>{searchEl.title}</h4></Link>
                  <span className={styles.card__rating}>{searchEl.rating.rate}</span>
                  <span className={styles.card__price}>{Math.trunc(searchEl.price)}</span>
                  <button className={styles.card__add} onClick={() => addToCartHandler(searchEl)}>Add to Cart</button>
                </div>
              </div>
            )
        })}
        </div>

      </div>
  )
}

export default AdvancedSearch