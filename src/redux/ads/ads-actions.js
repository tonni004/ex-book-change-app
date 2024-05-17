import { createAction } from "@reduxjs/toolkit";

export const fetchAdsRequest = createAction('ads/fetchAdsRequest');
export const fetchAdsSuccess = createAction('ads/fetchAdsSuccess');
export const fetchAdsError = createAction('ads/fetchAdsError');

export const addAdRequest = createAction('ads/addAdRequest');
export const addAdSuccess = createAction('ads/addAdSuccess');
export const addAdError = createAction('ads/addAdError');

export const deleteAdRequest = createAction('ads/deleteAdRequest');
export const deleteAdSuccess = createAction('ads/deleteAdSuccess');
export const deleteAdError = createAction('ads/deleteAdError');

export const editAdRequest = createAction('ads/editAdRequest');
export const editAdSuccess = createAction('ads/editAdSuccess');
export const editAdError = createAction('ads/editAdError');

export const fetchAdsByTitleRequest = createAction('ads/fetchAdsByTitleRequest');
export const fetchAdsByTitleSuccess = createAction('ads/fetchAdsByTitleSuccess');
export const fetchAdsByTitleError = createAction('ads/fetchAdsByTitleError');

export const fetchAdsByUserRequest = createAction('ads/fetchAdsByUserRequest');
export const fetchAdsByUserSuccess = createAction('ads/fetchAdsByUserSuccess');
export const fetchAdsByUserError = createAction('ads/fetchAdsByUserError');

export const addToFavouritesRequest = createAction('ads/addToFavouritesRequest');
export const addToFavouritesSuccess = createAction('ads/addToFavouritesSuccess');
export const addToFavouritesError = createAction('ads/addToFavouritesError');

export const searchAdsByIdRequest = createAction('ads/searchAdsByIdRequest');
export const searchAdsByIdSuccess = createAction('ads/searchAdsByIdSuccess');
export const searchAdsByIdError = createAction('ads/searchAdsByIdError');

export const fetchFavouritesAdsRequest = createAction('ads/fetchFavouritesAdsRequest');

export const deleteAdFromFavouritesRequest = createAction('ads/deleteAdFromFavouritesRequest');
export const deleteAdFromFavouritesSuccess = createAction('ads/deleteAdFromFavouritesSuccess');
export const deleteAdFromFavouritesError = createAction('ads/deleteAdFromFavouritesError');

export const CLEAR_ADS_INFO = 'CLEAR_USER_INFO';


