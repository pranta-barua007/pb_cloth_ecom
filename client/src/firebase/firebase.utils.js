import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD32bBlb_PowWojXeW3qbKK-65nXyttfoQ",
    authDomain: "pb-cloth-db.firebaseapp.com",
    databaseURL: "https://pb-cloth-db.firebaseio.com",
    projectId: "pb-cloth-db",
    storageBucket: "pb-cloth-db.appspot.com",
    messagingSenderId: "391701163315",
    appId: "1:391701163315:web:36fec4c2a99074ded62246",
    measurementId: "G-5PPBZRL6NG"
};


//creating user in data base of firestore on signup
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`); //document reference object

  const snapShot = await userRef.get(); //the representation of data

  //in order to create we have to use document ref object

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      alert('Sign Up Failed, please try again');
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

//function to get current user
  //if the promise resolves it will return with the userAuth obj
  //else will return null
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  }
)};

//function to get user cart from firestore
export const getUserCartRef = async userId => {
  const cartRef = firestore.collection('carts').where('userId', '==', userId);
  const snapShot = await cartRef.get();

  if(snapShot.empty) {
    const cartDocRef = firestore.collection('carts').doc();
    await cartDocRef.set(
      {
        userId,
        cartItems: []
      }
    );
    return cartDocRef;
  } else {
    //doc(0) = cartItems and doc(1) = userId in firestore
    return snapShot.docs[0].ref;
  }
};

//function to convert collections to map object
export const convertCollectionsSnapshotToMap = ( collections ) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
  return transformedCollection.reduce(( accumulator, collection ) => {
    accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
  }, {});
};


//function to make new collection and docs in cloud firestore
  //batch !!
    //is a method that secures the function succesfully does whole process of CRUD in server
    //if a single process fails it fails the whole process
    //so we dont have corrupted data if internet connection fails midway of the process
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch(); //init the batch from fire store

  objectsToAdd.forEach(obj => 
    {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    }
  );

  return await batch.commit(); //trigger the batch, it returns a promise, when it succed it return a void value(null)
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;