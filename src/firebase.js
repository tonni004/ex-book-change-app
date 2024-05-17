// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { ref } from "firebase/database";
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAFbgPBcCWHqyNawkuNE4Bezv92SKQsmN4",
    authDomain: "bookshop-app-26c08.firebaseapp.com",
    databaseURL: "https://bookshop-app-26c08-default-rtdb.firebaseio.com/",
    projectId: "bookshop-app-26c08",
    storageBucket: "bookshop-app-26c08.appspot.com",
    messagingSenderId: "888296062735",
    appId: "1:888296062735:web:bd331ab68c9783df16c87a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);


export const uploadFile = async (storageFolder, file) => {
    const storageRef = ref(storage, `${storageFolder}/${file.name}`);

    try {
        await uploadBytes(storageRef, file);
        const imageURL = await getDownloadURL(storageRef);
        return imageURL;
    } catch (error) {
        console.error('Error uploading file:', error);
        return null;
    }
};