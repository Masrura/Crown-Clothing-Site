
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles.jsx';

import { useSelector } from 'react-redux'
import { selectIsCartOpen, selectCartCount } from './../../store/cart/cart.selector'
import { setIsCartOpen } from './../../store/cart/cart.action'
import { useDispatch } from 'react-redux';
const CartIcon = () => {

    //const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
   // const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
    
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className = 'shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;