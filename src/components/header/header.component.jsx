import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';  //is a HOC 
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon  from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';


const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer >
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as="div" isSignout={true} onClick={() => auth.signOut()}>
                    SIGN OUT
                </OptionLink> 
                :
                <OptionLink to='/signin'>
                    SIGN IN
                </OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown />
        }
    </HeaderContainer>
);



// REDUX code start ----->

// state is coming from the upperlevel rootreducer
    //WHEN there is multiple items to be passed in we can use createStructuredSelector
    // it automatically passes the whole state in
const mapStateToProps = createStructuredSelector(
    {
        currentUser: selectCurrentUser,
        hidden: selectCartHidden
    }
);

// REDUX code end----->


export default connect(mapStateToProps)(Header);