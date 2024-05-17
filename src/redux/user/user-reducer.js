import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserError,
    addUserRequest,
    addUserSuccess,
    addUserError,
    deleteUserInfoRequest,
    deleteUserInfoSuccess,
    deleteUserInfoError,
    editUserInfoSuccess,
    logoutUserSuccess,
    CLEAR_USER_INFO,
} from "./user-actions";

const initialState = {};

const userInfo = createReducer([], builder => {
    builder
        .addCase(fetchUserSuccess, (_, { payload }) => payload)
        .addCase(addUserSuccess, (state, { payload }) => {
            return {
                ...state,
                ...payload

            };
        })
        .addCase(editUserInfoSuccess, (state, { payload }) => {
            return {
                ...state,
                ...payload

            };
        })
        .addCase(logoutUserSuccess, () => initialState)
        .addCase(CLEAR_USER_INFO, () => initialState)
        .addCase(deleteUserInfoSuccess, () => initialState);
});

export const isLoadingReducer = createReducer(false, builder => {
    builder
        .addCase(fetchUserRequest, () => true)
        .addCase(fetchUserSuccess, () => false)
        .addCase(fetchUserError, () => false)
        .addCase(addUserRequest, () => true)
        .addCase(addUserSuccess, () => false)
        .addCase(addUserError, () => false)
        .addCase(deleteUserInfoRequest, () => true)
        .addCase(deleteUserInfoSuccess, () => false)
        .addCase(deleteUserInfoError, () => false);
});


export default combineReducers({
    userInfo,
})