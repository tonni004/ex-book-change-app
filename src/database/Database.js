import { getDatabase, set, onValue, push, child, update, ref, get, query, orderByChild, equalTo } from "firebase/database";
import {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserError,
    addUserRequest,
    addUserSuccess,
    addUserError,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserError,
} from "../redux/user/user-actions";

//database function

const db = getDatabase();

export function addNewAd({ title, isbn, price, currency, description, adAuther }) {
    const adRef = ref(db, 'ads/');
    const newAdRef = push(adRef);
    const adID = newAdRef.key;

    set(newAdRef, {
        id: adID,
        title: title,
        isbn: isbn,
        adAuther: adAuther,
        price: price,
        currency: currency,
        description: description,
        // imageUrl: imageUrl
    }).then(() => {
        console.log('Success: New ad added to Firebase!');
    }).catch((error) => {
        console.error('Error adding ad to Firebase: ', error);
    });
}