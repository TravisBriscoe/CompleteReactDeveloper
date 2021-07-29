import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAneDc9ir-BM97a_W3v2TCkbtdM3TlCxzA",
  authDomain: "crwn-clothing-701b1.firebaseapp.com",
  projectId: "crwn-clothing-701b1",
  storageBucket: "crwn-clothing-701b1.appspot.com",
  messagingSenderId: "751615091125",
  appId: "1:751615091125:web:131f1cbb8e21ecb36ff9fc"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, displayName, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const shot = await userRef.get();

  if (!shot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('error creating user', err.message);
    }

  }
  
  return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;