// Import the functions you need from the SDKs you need. The pattern is...
//import {...} from 'firebase/[SERVICE]
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAnalytics} from 'firebase/analytics'
import {getAuth, GoogleAuthProvider, signInWithPopup, UserCredential} from "firebase/auth"

/*
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later
// NOTE: The naming of the env variables MUST
//       have the exact prefix of 'REACT_APP_'
//       otherwise they won't get read in properly.fjfjfjfj
//
// Also!!!!!!!!!  Remember you're reading in environment variables
// which are ONLY read when an app starts. Therefore, remember you
// may need to restart your IDE after you create your .env.local
// for your enviornment to read in the values stored in your env variables. 
*/
const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	//databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJ_ID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)
export const FirebaseAnalytics = getAnalytics(FirebaseApp)
export const GoogleFirebaseAuthProvider = new GoogleAuthProvider()