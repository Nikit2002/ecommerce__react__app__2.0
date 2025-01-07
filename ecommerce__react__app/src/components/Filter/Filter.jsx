import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSelectProducts } from '../../store/slices/productSlice';
import RangeSlider from "rsuite/RangeSlider";
import "rsuite/dist/rsuite.css";
import { useRef } from 'react';
import sortBy from 'sort-by';
import styles from './Filter.module.css'

const Filter = ({filteredProducts, setFilteredProducts}) => {
  const products = useSelector(useSelectProducts);
  const [filterPriceMin, setfilterPriceMin] = useState(0);
  const [filterPriceMax, setfilterPriceMax] = useState(100);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterStars, setFilterStars] = useState([]);
  const [fullFilter, setFullFilter] = useState({
      price: [0, 100],
      category: [],
      rating: []
  });
  const [checked, setChecked] = useState(true); 
  const checkbox = useRef();
  const range = useRef();
  const categories = [
    {
      name: "men's clothing", 
      index: 1 
    },
    {
      name: "women's clothing", 
      index: 2 
    },
    {
      name: "jewelery", 
      index: 3 
    },
    {
      name: "electronics", 
      index: 4
    } 
  ];
  const stars = [
    {
      name: "1 star", 
      index: 1,
      value: 1 
    },
    {
      name: "2 stars", 
      index: 2, 
      value: 2, 
    },
    {
      name: "3 stars", 
      index: 3, 
      value: 3, 
    },
    {
      name: "4 stars", 
      index: 4,
      value: 4
    },
    {
      name: "5 stars", 
      index: 5,
      value: 5
    } 
  ];
  const [ratingValues, setRatingValues] = useState([]);
  

  function handleRanges(value) {
   setfilterPriceMin(value[0]);
   setfilterPriceMax(value[1]);
   console.log(filterPriceMin);
   console.log(filterPriceMax);

  }


  const handleChange = (e) => {
    
    
    disableCheckbox();
    console.log(e.target.value);
    if (filterCategory.find(category => category == e.target.value)) {
      const sameCategory = (element) => element == e.target.value;
      const idx = filterCategory.findIndex(sameCategory);
      filterCategory.splice(idx, 1);
    } else {
      filterCategory.push(e.target.value)
    }
    
    console.log(filterCategory);
    if (filterCategory.find(category => category == e.target.value) || filterCategory.find(category => category != e.target.value)) {
      setChecked(!checked);
      checkbox.current.disabled = true;
    } else {
      setChecked(checked);
      disableCheckbox();
    }

    if (filterCategory.length == 0) {
      checkbox.current.disabled = false;
    }
    
    
    
    if (filterCategory.length > 1) {
      for (let j = 0; j < filterCategory.length; j++) {
          for (let i = 0; i < products.filter(product => product.category == filterCategory[j]).length; i++) {
          ratingValues.push(products[i].rating.rate);
          if (filterCategory[j] === products[i].category && Math.min(...ratingValues) > products[i].rating.rate < Math.max(...ratingValues)) {
            checkbox.current.disabled = true; 
          }
        }        
      }
    } else {
      for (let k = 0; k < products.filter(product => product.category == filterCategory).length; k++) {
          ratingValues.push(products[k].rating.rate);
          console.log(ratingValues);
          console.log(Math.min(...ratingValues));
          if (filterCategory[0] === products[k].category && 
             products[k].rating.rate < Math.max(...ratingValues) &&
            Math.min(...ratingValues) < products[k].rating.rate) {
            checkbox.current.disabled = true; 
          } 
      }        
    }

    

    
    
    
    return filterCategory;
  };

  const handleChangeStars = (e) => {
    filterStars.push(e.target.value);

    
    return filterStars;
  };

  function disableCheckbox () {
    checkbox.current.disabled = false; 
    setRatingValues(ratingValues.splice(0, ratingValues.length));
    console.log(ratingValues);
  }

  
  function resetFilters() {

    range.current.low = 0;
    range.current.high = 100;

    
    setFilteredProducts(products);

    return setFullFilter({
      price: [0, 100],
      category: [],
      rating: []
    })
  }

  function submitFilters() {
    console.log(filterPriceMin);
    console.log(filterPriceMax);
    console.log(filterCategory);
    console.log(filterStars);
    
    
    


    if (filterCategory.length == 0) {
      setFilteredProducts(products.filter(product => product.price >= filterPriceMin)
                                  .filter(product => product.rating.rate >= Math.min(...filterStars)))
    }


    if (filterPriceMin >= 0 && filterPriceMax <= 100) {
      if (filterCategory.length > 1) {
        setFilteredProducts(products.filter(product => product.rating.rate >= Math.min(...filterStars))
                                    .filter(product => filterCategory.includes(item => item == product.category) ||
                                    filterCategory.some(item => item == product.category)))
      } else {
        setFilteredProducts(products.filter(product => product.rating.rate >= Math.min(...filterStars))
                                    .filter(product => product.category == filterCategory[0])) 
      }
    }


    if (filterPriceMin >= 0 && filterPriceMax <= 100 && filterCategory.length == 0) {
      setFilteredProducts(products.filter(product => product.rating.rate >= Math.min(...filterStars)))
    } else {
      if (filterCategory.length > 1) {
        setFilteredProducts(products.filter(product => product.price >= filterPriceMin)
                                  .filter(product => filterCategory.includes(item => item == product.category) ||
                                  filterCategory.some(item => item == product.category))
                                  .filter(product => product.rating.rate >= Math.min(...filterStars)))
      } else {
        setFilteredProducts(products.filter(product => product.price >= filterPriceMin)
                                  .filter(product => product.category == filterCategory[0])
                                  .filter(product => product.rating.rate >= Math.min(...filterStars))) 
      }
       
    }

    if (filterPriceMin == 0 && filterPriceMax == 100 && filterStars.length == 0) {
      console.log(1);
      if (filterCategory.length > 1) {
        console.log(2);
        setFilteredProducts(products.filter(product => 
          filterCategory.includes(item => item == product.category) ||
          filterCategory.some(item => item == product.category)))
      } else {
        console.log(3);
        setFilteredProducts(products.filter(product =>  
              product.category == filterCategory[0]))
      }
    }


    if (filterStars.length == 0) {
      if (filterCategory.length > 1) {
        setFilteredProducts(products.filter(product => product.price >= filterPriceMin)
                                    .filter(product => filterCategory.includes(item => item == product.category) ||
                                    filterCategory.some(item => item == product.category)))
      } else {
        setFilteredProducts(products.filter(product => product.price >= filterPriceMin)
                                    .filter(product => product.category == filterCategory[0])) 
      }
    }

    if (filterCategory.length == 0 && filterStars.length == 0) {
      setFilteredProducts(products.filter(product => product.price >= filterPriceMin))
    }
    return filteredProducts;
  }

  


  return (
    <section className={styles.filter__section}>
      <div className={styles.filters}> 
      <div className={styles.filter__price}>
        <h2>Filter by price</h2>
        <RangeSlider ref={range} low={0} high={100} defaultValue={[0, 100]} onChange={handleRanges} />
        <p>Price parameters: {filterPriceMin} - {filterPriceMax}</p>
      </div>
      <div className={styles.filter__category}>
        <h2>Filter by category</h2>
        {categories.map(category => {
          return (
          <div key={category.index}>
          <input type="checkbox" 
            value={category.name}   
            onChange={handleChange} />
          <span>{category.name}</span>
          </div>
        )})}
      </div>
      <div className={styles.filter__rating}>
        <h2>Filter by rating</h2>
        {stars.map(star => {
          return (
          <div key={star.index}>
          <input type="checkbox" 
            value={star.value}
            ref={checkbox}
            onChange={handleChangeStars} />
          <span>{star.name}</span>
          </div>
        )})}
      </div>
      </div>
      <div className={styles.filter__Btns}>
      <button className={styles.reset__Btn} onClick={resetFilters}>Reset filters</button>
      <button className={styles.submit__Btn} type='submit' onClick={submitFilters}>Submit filters</button>
      </div>
    </section>
  )
}

export default Filter