import { createSelector } from 'reselect';


// reslect library provides a unique feature that allows our reducer to be MEMOIZED
//reselct provides 2 types of selector input selector & output selector


//input selector (doesnt use createSelector)

//input selector gets the whole state and returns only slice of it 1 layer deep usually
const selectCart = state => state.cart


//output selector (uses both input selector and createSelector)

    //output selector  gets 2 params, 1 is the list of the input selector(S) 2 is a func that retutn the value we want out of the createSelector
export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);
//as we are using createSelector so our output selctor selectCartItems is now memoized

    //output selector gets the selectCartItems as the 1st param which has (hidden) property
export const selectCartHidden = createSelector(
    [selectCart],
    (cart) => cart.hidden
);
    
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (accumilatedQuantity, cartItem) => accumilatedQuantity + cartItem.quantity , 0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
        (accumilatedQuantity, cartItem) => accumilatedQuantity + cartItem.quantity * cartItem.price , 0
    )
);
