import React from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>0</span>
    </div>
);


// REDUX code start ----->

// dispatch ensures whatever object is passed to it. its going to action obj that it pass to the reducer
  // setCurrentUser is a action object ,which dispatch needs
const mapDispatchToProps = dispatch => (
    {
        toggleCartHidden: () => dispatch(toggleCartHidden())
    }
);

// REDUX code end----->

export default connect(null, mapDispatchToProps)(CartIcon);