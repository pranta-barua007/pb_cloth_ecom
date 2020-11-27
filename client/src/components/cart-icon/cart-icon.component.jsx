import React from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
);


// REDUX code start ----->

    //WHEN there is multiple items(state) to be passed in we can use createStructuredSelector
    // it automatically passes the whole state in
const mapStateToProps = createStructuredSelector(
    {
        itemCount: selectCartItemsCount  
    }
);

// dispatch ensures whatever object is passed to it. its going to action obj that it pass to the reducer
  // setCurrentUser is a action object ,which dispatch needs
const mapDispatchToProps = dispatch => (
    {
        toggleCartHidden: () => dispatch(toggleCartHidden())
    }
);

// REDUX code end----->

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);