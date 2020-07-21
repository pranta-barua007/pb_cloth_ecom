import React from 'react';

import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';
 
import CustomButton from '../custom-button/custom-button.component';

import './collection-item.styles.scss';


const CollectionItem = ({ item, addItem }) => {
    const {name, price, imageUrl} = item;
    return (
        <div className='collection-item'>
            <div className='image' 
                style={{
                    background: `url(${imageUrl})`
                }}
            />
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <CustomButton onClick={() => addItem(item)} inverted>
             Add To Cart 
            </CustomButton>
        </div>
    ) 
}


// REDUX code start ----->

// dispatch ensures whatever object is passed to it. its going to action obj that it pass to the reducer
  // setCurrentUser is a action object ,which dispatch needs
const mapDispatchToProps = dispatch => (
    {
        addItem: item => dispatch(addItem(item)) 
    }
);

// REDUX code end----->

export default connect(null, mapDispatchToProps)(CollectionItem);

