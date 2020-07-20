import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';  //is a HOC 

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import CartIcon  from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';


const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option signout' onClick={() => auth.signOut()}>
                    SIGN OUT
                </div> 
                :
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            }
            <CartIcon />
        </div>
        {
            hidden ? null : <CartDropdown />
        }
    </div>
);



// REDUX code start ----->

// state is coming from the upperlevel rootreducer
    //advanced destructuring user, cart off of state
const mapStateToProps = ({ user: {currentUser}, cart: {hidden} }) => (
    {
        currentUser,
        hidden
    }
);

// REDUX code end----->


export default connect(mapStateToProps)(Header);