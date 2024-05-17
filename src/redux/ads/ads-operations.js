import { getDatabase, ref, remove, get, push, set, query, orderByChild, equalTo, update, } from "firebase/database";
import { toast } from 'react-toastify';

import {

    fetchAdsByTitleRequest,
    fetchAdsByTitleSuccess,
    fetchAdsByTitleError,
    fetchAdsByUserRequest,
    fetchAdsByUserSuccess,
    fetchAdsByUserError,
    addAdRequest,
    addAdSuccess,
    addAdError,
    deleteAdRequest,
    deleteAdSuccess,
    deleteAdError,
    editAdRequest,
    editAdSuccess,
    editAdError,
    addToFavouritesRequest,
    addToFavouritesError,
    deleteAdFromFavouritesRequest,
    deleteAdFromFavouritesSuccess,
    deleteAdFromFavouritesError,
    fetchFavouritesAdsRequest,
    searchAdsByIdRequest,
    searchAdsByIdSuccess,
    searchAdsByIdError,
    CLEAR_ADS_INFO,
} from './ads-actions';


const db = getDatabase();

export const editAdInfo = (adId, { adAuther, title, isbn, description, price, currency, imageURL = "" }) => async dispatch => {
    dispatch(editAdRequest());
    try {
        const adRef = ref(db, `ads/${adId}`);

        const adSnapshot = await get(adRef);

        if (adSnapshot.exists()) {
            await update(ref(db, `ads/${adId}`), {
                adAuther: adAuther,
                title: title,
                isbn: isbn,
                description: description,
                price: price,
                currency: currency,
                imageURL: imageURL,
            });

            const updatedAdSnapshot = await get(adRef);
            const updatedAdData = updatedAdSnapshot.val();

            dispatch(editAdSuccess(updatedAdData));
        } else {
            dispatch(editAdError("Error! Ad not found"));
            toast.error(`Error! Ad not found`)

            return null;
        }
    } catch (error) {
        dispatch(editAdError(error.message));
        toast.error(`Error! Ad not edit`)

        return null;
    }
}

export const searchAds = (title) => async (dispatch) => {
    dispatch(fetchAdsByTitleRequest());
    const searchAd = ref(db, 'ads/');

    try {
        const snapshot = await get(searchAd);
        const data = snapshot.val();
        const matchingAds = [];

        for (const adKey in data) {
            const ad = data[adKey];
            const adTitle = ad.title.toLowerCase();
            const searchTitle = title.toLowerCase();

            if (adTitle.includes(searchTitle)) {
                matchingAds.push(ad);
            }
        }

        dispatch(fetchAdsByTitleSuccess(matchingAds));

    } catch (error) {
        dispatch(fetchAdsByTitleError(error.message));
        toast.error(`Error! Ad not found`)

    }
};

export const searchUserAds = (user) => async (dispatch) => {
    dispatch(fetchAdsByUserRequest());
    const searchAd = ref(db, 'ads/');

    try {
        const snapshot = await get(searchAd);
        const data = snapshot.val();
        const matchingAds = [];

        for (const adKey in data) {
            const ad = data[adKey];
            const adTitle = ad.adAuther;
            const searchTitle = user;

            if (adTitle.includes(searchTitle)) {
                matchingAds.push(ad);
            }
        }

        dispatch(fetchAdsByUserSuccess(matchingAds));

    } catch (error) {
        dispatch(fetchAdsByUserError(error.message));
        toast.error(`Error! User's ads not found`)

    }
};

export const addNewAd = ({ title, isbn, price, currency, description, adAuther, imageURL = "" }) => async dispatch => {
    dispatch(addAdRequest());

    const adRef = ref(db, 'ads/');
    const newAdRef = push(adRef);
    const adID = newAdRef.key;

    const newAd = {
        id: adID,
        title: title,
        isbn: isbn,
        adAuther: adAuther,
        price: price,
        currency: currency,
        description: description,
        imageURL: imageURL
    };

    try {
        await set(newAdRef, newAd)
        dispatch(addAdSuccess(newAd));
    } catch (error) {
        dispatch(addAdError(error.message));
        toast.error(`Error! Ad not created`)

    }
}

export const deleteAd = (adId) => async dispatch => {
    dispatch(deleteAdRequest())
    try {
        const adRef = ref(db, 'ads/' + adId);
        await remove(adRef);
        dispatch(deleteAdSuccess(adId));
    } catch (error) {
        dispatch(deleteAdError(error.message));
        toast.error(`Error! Ad not deleted`)

    }
};


export const addToFavorites = (userId, adId) => async dispatch => {
    dispatch(addToFavouritesRequest());
    try {
        const usersRef = ref(db, 'users');
        const userQuery = query(usersRef, orderByChild('userID'), equalTo(userId));
        const userSnapshot = await get(userQuery);

        if (userSnapshot.exists()) {
            const userKey = Object.keys(userSnapshot.val())[0];
            const userFavouritesRef = ref(db, `users/${userKey}/favouritesAds/${adId}`);

            await set(userFavouritesRef, true);
            dispatch(searchAdsById(adId));
        } else {
            dispatch(addToFavouritesError("User not found."));
            toast.error(`Error! User not found`)

        }
    } catch (error) {
        dispatch(addToFavouritesError(error.message));
        toast.error(`Error! Ad not added to favorites`)

    }
};

export const fetchFavouritesAds = (userId) => async (dispatch) => {
    dispatch(fetchFavouritesAdsRequest());
    try {
        const usersRef = ref(db, 'users');
        const userQuery = query(usersRef, orderByChild('userID'), equalTo(userId));
        const userSnapshot = await get(userQuery);

        if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            const userKey = Object.keys(userData)[0];
            const userFavouritesRef = ref(db, `users/${userKey}/favouritesAds`);
            const userFavouritesSnapshot = await get(userFavouritesRef);

            if (userFavouritesSnapshot.exists()) {
                const favouriteAds = userFavouritesSnapshot.val();
                const adIds = Object.keys(favouriteAds);

                for (const adId of adIds) {
                    await dispatch(searchAdsById(adId));
                }
            } else {
                toast.error(`Error! User has no favourite ads`)

            }
        } else {
            toast.error(`Error! User not found`)

        }
    } catch (error) {
        toast.error(`Error! Favourites ads not found`)

    }
};


export const searchAdsById = (id) => async (dispatch) => {
    dispatch(searchAdsByIdRequest());
    const searchAdRef = ref(db, `ads/${id}`);

    try {
        const snapshot = await get(searchAdRef);
        const adData = snapshot.val();

        if (adData) {
            const matchingAds = [adData];
            dispatch(searchAdsByIdSuccess(matchingAds));
        } else {
            const errorMessage = "Ad not found with ID";
            dispatch(searchAdsByIdError(errorMessage));
            toast.error(`Error! Ad not found with ID`)

        }
    } catch (error) {
        dispatch(searchAdsByIdError(error.message));
        toast.error(`Error! Ad's not found`)
    }
};
export const deleteAdFromFavourites = (userId, adId) => async dispatch => {
    dispatch(deleteAdFromFavouritesRequest());

    try {
        const usersRef = ref(db, 'users');
        const userQuery = query(usersRef, orderByChild('userID'), equalTo(userId));
        const userSnapshot = await get(userQuery);

        if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            const userKey = Object.keys(userData)[0];

            const userFavouritesRef = ref(db, `users/${userKey}/favouritesAds/${adId}`);

            await remove(userFavouritesRef);

            dispatch(deleteAdFromFavouritesSuccess(adId));

        } else {
            toast.error(`Error! Ad's not found`)
        }
    } catch (error) {
        dispatch(deleteAdFromFavouritesError(error.message));
        toast.error(`Error! Ad's not deleted`)
    }
};

export const clearAdsInfo = () => ({
    type: CLEAR_ADS_INFO
});




