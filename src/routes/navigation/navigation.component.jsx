import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import {useSelector } from 'react-redux'
import {selectCurrentUser} from './../../store/user/user.selector'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles.jsx';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import {selectIsCartOpen} from './../../store/cart/cart.selector'


const Navigation = () => {
    // const currentUser = useSelector((state) => state.user.currentUser);
     const currentUser = useSelector(selectCurrentUser);
   // const { currentUser } = useContext(UserContext);
    //const { isCartOpen } = useContext(CartContext);
    const isCartOpen = useSelector(selectIsCartOpen);
    
    // console.log(currentUser);
    const signOutHandler = async () => {
        await signOutUser();
        //setCurrentUser(null);
    }
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as = 'span' onClick={signOutHandler}>Sign Out</NavLink>
                        ) : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;