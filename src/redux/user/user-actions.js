import { createAction } from "@reduxjs/toolkit";

export const fetchUserRequest = createAction('user/fetchUserRequest');
export const fetchUserSuccess = createAction('user/fetchUserSuccess');
export const fetchUserError = createAction('user/fetchUserError');

export const addUserRequest = createAction('user/addUserRequest');
export const addUserSuccess = createAction('user/addUserSuccess');
export const addUserError = createAction('user/addUserError');

export const editUserInfoRequest = createAction('user/editUserInfoRequest');
export const editUserInfoSuccess = createAction('user/editUserInfoSuccess');
export const editUserInfoError = createAction('user/editUserInfoError');

export const logoutUserRequest = createAction('user/logoutUserRequest');
export const logoutUserSuccess = createAction('user/logoutUserSuccess');
export const logoutUserError = createAction('user/logoutUserError');

export const clearUserInfoRequest = createAction('user/clearUserInfoRequest');
export const clearUserInfoSuccess = createAction('user/clearUserInfoSuccess');
export const clearUserInfoError = createAction('user/clearUserInfoError');

export const deleteUserInfoRequest = createAction('user/deleteUserInfoRequest');
export const deleteUserInfoSuccess = createAction('user/deleteUserInfoSuccess');
export const deleteUserInfoError = createAction('user/deleteUserInfoError');

export const updateUserChatsRequest = createAction('user/updateUserChatsRequest');
export const updateUserChatsSuccess = createAction('user/updateUserChatsSuccess');
export const updateUserChatsError = createAction('user/updateUserChatsError');

export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

export const clearUserInfo = () => ({
    type: CLEAR_USER_INFO
});
