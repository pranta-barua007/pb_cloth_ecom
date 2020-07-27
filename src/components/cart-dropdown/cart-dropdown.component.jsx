import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import CartItem from '../cart-item/cart-item.component';

import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem} />
                ))
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
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

export default connect(mapStateToProps)(CartDropdown);