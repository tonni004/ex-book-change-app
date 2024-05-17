import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
    fetchAdsSuccess,
    fetchAdsError,
    addAdSuccess,
    addAdError,
    fetchAdsByTitleSuccess,
    fetchAdsByTitleError,
    fetchAdsByUserSuccess,
    fetchAdsByUserError,
    deleteAdSuccess,
    deleteAdError,
    addToFavouritesSuccess,
    addToFavouritesError,
    searchAdsByIdSuccess,
    searchAdsByIdError,
    deleteAdFromFavouritesSuccess,
    deleteAdFromFavouritesError,
    editAdSuccess,
    CLEAR_ADS_INFO,
    UPDATE_ADS_INFO,
    UPDATE_USER_ADS,
} from "./ads-actions";

const initialState = [];

const ads = createReducer(initialState, builder => {
    builder
        .addCase(fetchAdsSuccess, (_, { payload }) => payload)
        .addCase(editAdSuccess, (state, { payload }) => {
            return state.map(ad => {
                if (ad.id === payload.id) {
                    return payload;
                }
                return ad;
            });
        })
        .addCase(deleteAdSuccess, (state, { payload }) => {
            const updatedState = state.filter(ad => ad.id !== payload);
            return updatedState;
        })
        .addCase(fetchAdsByTitleSuccess, (_, { payload }) => payload)
        .addCase(CLEAR_ADS_INFO, () => initialState)

});

const userAds = createReducer(initialState, builder => {
    builder
        .addCase(fetchAdsByUserSuccess, (_, { payload }) => {
            return payload;
        })
        .addCase(addAdSuccess, (state, { payload }) => {
            return [...state, payload];
        })
        .addCase(deleteAdSuccess, (state, { payload }) => {
            const updatedState = state.filter(ad => ad.id !== payload);
            return updatedState;
        })
        .addCase(editAdSuccess, (state, { payload }) => {
            return state.map(ad => {
                if (ad.id === payload.id) {
                    return payload;
                }
                return ad;
            });
        })
        .addCase(CLEAR_ADS_INFO, () => initialState)

})
const favouritesAds = createReducer(initialState, builder => {
    builder
        .addCase(searchAdsByIdSuccess, (state, { payload }) => {
            const existingAdsIds = state.map(ad => ad.id);
            const newAds = payload.filter(ad => !existingAdsIds.includes(ad.id));
            return [...state, ...newAds];
        })
        .addCase(deleteAdFromFavouritesSuccess, (state, { payload }) =>
            state.filter(ad => ad.id !== payload))
        .addCase(CLEAR_ADS_INFO, () => initialState)
})

const setError = (_, { payload }) => payload;

const error = createReducer(null, (builder) => {
    builder
        .addCase(fetchAdsError, setError,)
        .addCase(addAdError, setError)
        .addCase(fetchAdsByTitleError, setError)
        .addCase(fetchAdsByUserError, setError)
        .addCase(deleteAdError, setError)
        .addCase(addToFavouritesError, setError)

})

export default combineReducers({
    ads,
    userAds,
    favouritesAds,
    error,
})