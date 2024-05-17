import { createAction } from "@reduxjs/toolkit";

export const registerRequest = createAction('authUser/registerRequest');
export const registerSuccess = createAction('authUser/registerSuccess');
export const registerError = createAction('authUser/registerError');

export const loginRequest = createAction('authUser/loginRequest');
export const loginSuccess = createAction('authUser/loginSuccess');
export const loginError = createAction('authUser/loginError');

export const logoutRequest = createAction('authUser/logoutRequest');
export const logoutSuccess = createAction('authUser/logoutSuccess');
export const logoutError = createAction('authUser/logoutError');

export const currentUserSuccess = createAction('authUser/currentUserSuccess');

export const deleteUserRequest = createAction('authUser/deleteUserRequest');
export const deleteUserSuccess = createAction('authUser/deleteUserSuccess');
export const deleteUserError = createAction('authUser/deleteUserError');
