import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';//local storage from window object of browser

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

//everything from the root ,whitelist consist what reducer should be persist (should be using storage)
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers (
    {
        user: userReducer,
        cart: cartReducer
    }
);

export default persistReducer(persistConfig, rootReducer);