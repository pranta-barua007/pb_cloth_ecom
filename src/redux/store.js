import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist'; // persisted version of store to manage storage

import rootReducer from './root-reducer';

const middleWares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middleWares));

//modified version of store with caching feature
export const persistor = persistStore(store);

export default { store, persistor };