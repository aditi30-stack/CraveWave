import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const loadCartFromStorage = () =>{
    try {
        const serializedCart = localStorage.getItem('cart')
        if (serializedCart === null) {
            return { items: []}
        }
        return JSON.parse(serializedCart)

    }catch(e){
        console.log("Failed to load cart from localStorage", e)
        return { items: []}

    }
}

const saveCartToLocalStorage = (state) =>{
    try {
        const serializedCart = JSON.stringify(state);
        localStorage.setItem('cart', serializedCart)
    }catch(e){
        console.warn("failed to save cart to localStorage", e)
    }
}


const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartFromStorage(),
    reducers: {
        addItem: (state, action) =>{
            const existingItem = state.items.find((item) => item.name === action.payload.name)
            if (existingItem){
                existingItem.quantity +=1
            } else {
                state.items.push({
                    name: action.payload.name,
                    price: action.payload.price,
                    image: action.payload.image,
                    quantity: 1
                })
            }
            saveCartToLocalStorage(state);
        },
        removeItem: (state, action) =>{
            const existingItem = state.items.find((item)=> item.name === action.payload.name)
            if(existingItem.quantity > 1) {
                existingItem.quantity -=1
            }
            else {
                state.items = state.items.filter((item) => item.name !== action.payload.name)
            }
            saveCartToLocalStorage(state)
            
        },
        clearCart: (state) =>{
            state.items = []
            saveCartToLocalStorage(state)
        }
    }
})

export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
