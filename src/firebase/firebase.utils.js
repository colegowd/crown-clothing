import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC-FfkMLBl8Mh0fU07kKWErzEUwEOyz5gM",
  authDomain: "crown-db-df599.firebaseapp.com",
  databaseURL: "https://crown-db-df599.firebaseio.com",
  projectId: "crown-db-df599",
  storageBucket: "crown-db-df599.appspot.com",
  messagingSenderId: "238350665548",
  appId: "1:238350665548:web:7c9ecc8a9e26f4097e31e9",
  measurementId: "G-CM2399FDLR"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }
    catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;