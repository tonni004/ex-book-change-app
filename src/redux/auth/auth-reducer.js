import { createReducer, combineReducers } from "@reduxjs/toolkit";

import {
    registerSuccess,
    registerError,
    loginSuccess,
    loginError,
    logoutSuccess,
    logoutError,
    deleteUserSuccess,
    deleteUserError,
} from './auth-actions';


const setError = (_, { payload }) => payload;

const error = createReducer(null, (builder) => {
    builder
        .addCase(registerError, setError)
        .addCase(loginError, setError)
        .addCase(logoutError, setError)
        .addCase(deleteUserError, setError)
})
const authUser = createReducer({}, (builder) => {
    builder
        .addCase(registerSuccess, (_, { payload }) => {
            return payload;
        })
        .addCase(loginSuccess, (_, { payload }) => {
            return payload;
        })
        .addCase(logoutSuccess, () => {
            return {};
        })
        .addCase(deleteUserSuccess, () => {
            return {};
        })
})

const isAuthenticated = createReducer(false, (builder) => {
    builder
        .addCase(registerSuccess, () => true)
        .addCase(loginSuccess, () => true)
        .addCase(logoutSuccess, () => false)
        .addCase(registerError, () => false)
        .addCase(loginError, () => false)
        .addCase(deleteUserSuccess, () => false)
});

export default combineReducers({
    authUser,
    isAuthenticated,
    error,
})