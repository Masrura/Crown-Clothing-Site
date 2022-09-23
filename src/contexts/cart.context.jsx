import { createContext, useState, useEffect, useReducer } from "react";
import {createAction} from '../utils/reducer/reducer.utils' 

const addCartItems = (cartItems, productToAdd) => {
    //Find if cat item has the product to add already
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    //if found increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }
    //return the new array of cart items
    return [...cartItems, {...productToAdd, quantity:1}]
}

const removeCartItems = (cartItems, cartItemToRemove) => {
    //Find if cat item has the product to add already
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }

    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


const CART_ACTION_TYPES = {

    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems:[],
    cartCount:0,
    cartTotal:0,
    
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS: 
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            return state;
    }
}  

export const CartContext = createContext({
    isCartOpen: false,
    setIscartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartItemCount :0,
})

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    
    const cartItems = state.cartItems;
    const isCartOpen = state.isCartOpen;
    const cartCount = state.cartCount;
    const cartTotal = state.cartTotal;

     //const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartItemCount, setCartItemCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    // useEffect(() => {
    //     const count = cartItems.reduce(
    //         (total, cartItem) => total + cartItem.quantity,
    //         0)
    //     setCartItemCount(count);
    // }, [cartItems]);

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce(
    //         (total, cartItem) => total + cartItem.quantity * cartItem.price,
    //         0
    //     );
    //     setCartTotal(newCartTotal);
    // }, [cartItems]);

    const updateCartItemsReducer = (newCartItems) => {
       
       // generate new cartTotal
        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
        //generate new cartCount
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0)
        //dispatch new action with payload
        //dispatch({ type: 'SET_CART_ITEMS', payload: { cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal} });
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal }));
          //newCartItems
          //newCartTotal
        
        
    }
    const addItemToCart = (productToAdd) => {
        const newCartItems = (addCartItems(cartItems, productToAdd));
        updateCartItemsReducer(newCartItems);
    }
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = (removeCartItems(cartItems, cartItemToRemove));
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = (clearCartItem(cartItems, cartItemToClear));
        updateCartItemsReducer(newCartItems);
    };
    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };
    return <CartContext.Provider value={value}> {children}</CartContext.Provider>
}