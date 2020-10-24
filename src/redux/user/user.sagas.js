import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure } from './user.actions';

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        );
    }catch(error) {
        yield put(signInFailure(error));
    }
}

//GOOGLE sign in 
export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    }catch(error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

//EMAIL and password sign in
export function* signInWithEmail({payload: { email, password }}) {
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    }catch(error) {
        yield put(signInFailure(error));
    }
    
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

//Check user seesion
export function* isUserAuthenticated() {
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    }catch(error) {
       yield put(signInFailure(error));
    }
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

//sign out user 
export function* signOut() {
    try{
        yield auth.signOut();
        yield put(signOutSuccess());
    }catch(error) {
        yield put(signOutFailure(error))
    }
}

export function* onSignOut() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

//contains all user sagas
export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOut)  
    ]);
}

