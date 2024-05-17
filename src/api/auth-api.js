import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFbgPBcCWHqyNawkuNE4Bezv92SKQsmN4",
    authDomain: "bookshop-app-26c08.firebaseapp.com",
    projectId: "bookshop-app-26c08",
    storageBucket: "bookshop-app-26c08.appspot.com",
    messagingSenderId: "888296062735",
    appId: "1:888296062735:web:bd331ab68c9783df16c87a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


