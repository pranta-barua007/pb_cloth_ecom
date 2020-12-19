import { takeLatest, put, all, call, select } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { selectCurrentUser } from '../user/user.selectors';
import CartActionTypes from './cart.types';
import { setCartFromFirebase, clearCart } from './cart.actions';
import { selectCartItems } from './cart.selectors';

import { getUserCartRef } from '../../firebase/firebase.utils';

//check current user cart
    //select() an portion of the state can be passed
    //if invoked with no state select() then the effect is resolved with the entire state
export function* checkCartFromFirebase({ payload: user }) {
    const cartRef = yield getUserCartRef(user.id);
    const cartSnapShot = yield cartRef.get();
    yield put(setCartFromFirebase(cartSnapShot.data().cartItems));
};

export function* onUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase);  
}

//update current user cart information
export function* updateCartInFirebase() {
    const currentUser = yield select(selectCurrentUser);
    if (currentUser) {
        try {
        const cartRef = yield getUserCartRef(currentUser.id);
        const cartItems = yield select(selectCartItems);
        yield cartRef.update({ cartItems });
        } catch (error) {
        console.log(error);
        }
    }
};

export function* onCartChange() {
    yield takeLatest(
        [
            CartActionTypes.ADD_ITEM,
            CartActionTypes.REMOVE_ITEM,
            CartActionTypes.CLEAR_ITEM_FROM_CART
        ],
        updateCartInFirebase
    );
}

//clear cart on sign out
export function* clearCartOnSignOut() {
    yield put(clearCart());
};

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
};

//base cart saga
export function* cartSagas() {
    yield all([
        call(onSignOutSuccess),
        call(onCartChange),
        call(onUserSignIn)
    ])
};