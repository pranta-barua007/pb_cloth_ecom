import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => (
    {
        type: ShopActionTypes.FETCH_COLLECTIONS_START,
    }
);

export const fetchCollectionsSuccess = (collectionsMap) => (
    {
        type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload: collectionsMap
    }
);

export const fetchCollectionsFilure = (errorMessage) => (
    {
        type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
        payload: errorMessage
    }
);

export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

        //Promise pattern
            //doesn't support LIVE update, will only update when the app remount 
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsFilure(error.message)));
    }
        //Observer pattern 
            //supports LIVE UPDATE stream style
        // collectionRef.onSnapshot(async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     dispatch(fetchCollectionSuccess(collectionsMap));
        // }).catch(error => dispatch(fetchCollectionFilure(error.message)));
};