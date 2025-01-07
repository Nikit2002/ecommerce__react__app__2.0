import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0,
    cartNumber: localStorage.getItem('cartNumber') ? JSON.parse(localStorage.getItem('cartNumber')) : 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            console.log(item.id);
            
            const sameItem = state.cartItems.filter((el) => item.id === el.id);
            console.log(sameItem);
            const index = state.cartItems.findIndex((el) => item.id === el.id);
           if (sameItem.length != 0) { 
            state.totalItems++;
            state.total += Math.trunc(item.price);
            state.cartItems[index].quantity += 1;
            localStorage.setItem("products", JSON.stringify(state.cartItems));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems)); 
            localStorage.setItem("cartNumber", JSON.stringify(state.cartNumber));

           } else {

            state.cartNumber++;
            state.cartItems.push({
                category: item.category,
                description: item.description,
                id: item.id,
                image: item.image,
                numberInCart: state.cartNumber,
                price: Math.trunc(item.price),
                title: item.title,
                quantity: 1
            });
            state.totalItems++;
            state.total += Math.trunc(item.price);
            localStorage.setItem("products", JSON.stringify(state.cartItems));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems)); 
            localStorage.setItem("cartNumber", JSON.stringify(state.cartNumber)); 
            
           }
        },
        removeFromCart: (state, action) => {
            const item = action.payload;
            const index = state.cartItems.findIndex((el) => item.id === el.id);

            state.totalItems -= state.cartItems[index].quantity;
            state.cartItems[index].price = 0;
            state.cartItems[index].quantity = 0;
            for (let i = index; i < state.cartItems.length; i++) {
                state.cartItems[i].numberInCart = state.cartItems[i].numberInCart - 1;
            }
            state.cartNumber--;
            state.cartItems.splice(index, 1);
            state.total -= item.price * item.quantity;
            
            localStorage.setItem("cartNumber", JSON.stringify(state.cartNumber));
            localStorage.setItem("products", JSON.stringify(state.cartItems));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        },
        resetCart: (state) => {
            state.cartItems.splice(0, state.cartItems.length);
            state.total = 0;
            state.totalItems = 0;
            state.cartNumber = 0;
            localStorage.setItem("products", JSON.stringify(state.cartItems));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("cartNumber", JSON.stringify(state.cartNumber));
        },
        increaseCart: (state, action) => {
            const item = action.payload;
            const index = state.cartItems.findIndex((el) => item.id === el.id);
            const basePrice = item.price;

            state.totalItems++;
            state.cartItems[index].quantity += 1;
            state.total = state.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

            localStorage.setItem("products", JSON.stringify(state.cartItems));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        },
        decreaseCart: (state, action) => {
            const item = action.payload;
            const index = state.cartItems.findIndex((el) => item.id === el.id);

            state.totalItems--;
            state.cartItems[index].quantity -= 1;
            state.total -= item.price;
            console.log(state.cartItems[index].quantity);
            if (state.cartItems[index].quantity == 0) {
                for (let i = index; i < state.cartItems.length; i++) {
                    state.cartItems[i].numberInCart = state.cartItems[i].numberInCart - 1;
                }
                state.cartNumber--;
                state.cartItems[index].price = 0;
                state.cartItems.splice(index, 1);
                localStorage.setItem("cartNumber", JSON.stringify(state.cartNumber));
                  
            }

            localStorage.setItem("products", JSON.stringify(state.cartItems));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        } 
        
    }
})

export const { addToCart, resetCart, removeFromCart, increaseCart, decreaseCart } = cartSlice.actions;

export const removeCartItem = (state) => state.cartItems;

export default cartSlice.reducer;