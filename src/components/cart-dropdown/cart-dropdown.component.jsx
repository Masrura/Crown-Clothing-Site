import React from 'react';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '../../contexts/cart.context';
import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'
import { useSelector } from 'react-redux'
import {selectCartItems  } from './../../store/cart/cart.selector'

const CartDropdown = () => {
    const  cartItems  = useSelector(selectCartItems);
    const navigate = useNavigate();
    const goToCheckout = () => {
        navigate('/checkout');
}
    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ?
                    cartItems.map(item => <CartItem key={item.id} cartItem={item}></CartItem>)
                    : <EmptyMessage >Your Cart is Empty</EmptyMessage >
                }
            </CartItems>
            <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
 
}

export default CartDropdown;