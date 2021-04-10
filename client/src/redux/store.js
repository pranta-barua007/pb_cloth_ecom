import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

//saga middle ware to handle async actions instead of 'redux-thunk'
import createSagaMiddleware from 'redux-saga';

import { persistStore } from 'redux-persist'; // persisted version of store to manage storage

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();//activating the middleware to listen async events

const middlewares = [sagaMiddleware];

// For development
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger); 
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);//pass every saga events here to be listened by redux saga

//modified version of store with caching feature
export const persistor = persistStore(store);

//export default { store, persistor };