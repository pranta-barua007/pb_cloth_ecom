import { all, call, put, takeLatest } from 'redux-saga/effects';

import ShopActionTypes  from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFilure } from './shop.actions';

//generator function
    //yield pauses the function(generator function must have 'yield')
//call take a function as 1st param , and arguments in 2nd.... params)
//put works like 'dispatch' dispatching actions to component
export function* fetchCollectionsStartAsync(){
    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    }catch (error) {
        yield put(fetchCollectionsFilure(error.message));
    }
}

//takeEvery()
    //recieves an 'action type' as 1st param, and a generator func as 2nd param which refers to the action
    //takeEvery creates a non blocking(doesn't stop javascript) flow in generator function
        //for the action it listens in 1st param, it runs the generator func in 2nd param 
        //(looping every time it listens to that specific function)

//takeLatest()
    //concentrates more ob latest changes of the state
export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsStartAsync
    );
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
};