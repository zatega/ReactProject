// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCdkm6cO_T_-fdXHPNeqIB-H7TwNvcEVd4",
	authDomain: "time-tracker-76045.firebaseapp.com",
	projectId: "time-tracker-76045",
	storageBucket: "time-tracker-76045.appspot.com",
	messagingSenderId: "162203445897",
	appId: "1:162203445897:web:0fd6560ce8edbf3bbf3458"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export { isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged, signOut, sendSignInLinkToEmail } from "firebase/auth";
export { FirebaseError } from "firebase/app"
export { fetchUserActivityData, fetchUserActivityDataRecurring } from "./activity-data";
export { getAuth };