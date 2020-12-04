import React from 'react';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import CartItem from '../cart-item/cart-item.component';

import {
    CartDropdownContainer,
    CartDropdownButton,
    EmptyMessageContainer,
    CartItemsContainer
} from './cart-dropdown.styles';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <CartDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      )}
    </CartItemsContainer>
    <CartDropdownButton
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
);


// REDUX code start ----->

// destructuring the cart reducer, will get cartItems from it 
  //need the cartItems STATE to render the right page
  
   //WHEN there is multiple items to be passed in we can use createStructuredSelector
    // it automatically passes the whole state in
const mapStateToProps = createStructuredSelector(
    {
        cartItems: selectCartItems
    }
);

// REDUX code end----->

export default withRouter(connect(mapStateToProps)(CartDropdown));

//in connect() if the 2nd params is not passed (after mapStateToProps) it will automatically pass the dispatch 
//now we have access to the dispatch, if we destruct it dispatch in our component
    // we are using shorthand of dispatch for toogleCartIcon() 