import { toast } from 'react-toastify';
import { getDatabase, set, push, update, ref, get, query, orderByChild, equalTo, remove } from "firebase/database";

import {
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserError,
    addUserRequest,
    addUserSuccess,
    addUserError,
    editUserInfoRequest,
    editUserInfoSuccess,
    editUserInfoError,
    deleteUserInfoRequest,
    deleteUserInfoSuccess,
    deleteUserInfoError,
} from "./user-actions";
import { deleteCurrentUser } from '../../api-functions/api-functions';
const db = getDatabase();

export const addNewUser = ({ imageURL = "", name = "", nickname, description = "", location = "", userID }) => async dispatch => {
    dispatch(addUserRequest());
    const adRef = ref(db, 'users/');
    const newUserRef = push(adRef);

    try {
        await set(newUserRef, {
            userID: userID,
            imageURL: imageURL,
            name: name,
            nickname: nickname,
            description: description,
            location: location,
        });
        const user = {
            userID: userID,
            imageURL: imageURL,
            name: name,
            nickname: nickname,
            description: description,
            location: location,
        }
        dispatch(addUserSuccess(user));
    } catch (error) {
        dispatch(addUserError(error.message));
        toast.error(`Error! New user not added`)
    }
};

export const fetchUserByID = (id) => async dispatch => {
    dispatch(fetchUserRequest());
    try {
        const usersRef = ref(db, 'users');
        const userQuery = query(usersRef, orderByChild('userID'), equalTo(id));
        const userSnapshot = await get(userQuery);

        if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            const userKey = Object.keys(userData)[0];
            const user = userData[userKey];
            dispatch(fetchUserSuccess(user));
            return user;
        } else {
            dispatch(fetchUserError("Error adding user"));
            return null;
        }
    } catch (error) {
        dispatch(fetchUserError(error.message));
        toast.error(`Error adding user`)
        return null;
    }
};

export const editUserInfo = (userId, { name, nickname, description, location, imageURL }) => async dispatch => {
    dispatch(editUserInfoRequest());
    try {
        const usersRef = ref(db, 'users');
        const userQuery = query(usersRef, orderByChild('userID'), equalTo(userId));
        const userSnapshot = await get(userQuery);

        if (userSnapshot.exists()) {
            const userKey = Object.keys(userSnapshot.val())[0];
            const userRef = ref(db, `users/${userKey}`);

            await update(userRef, {
                name: name,
                nickname: nickname,
                // gender: gender,
                description: description,
                location: location,
                imageURL: imageURL,
            });

            const updatedUserSnapshot = await get(userRef);
            const updatedUserData = updatedUserSnapshot.val();

            dispatch(editUserInfoSuccess(updatedUserData));
            return updatedUserData;
        } else {
            dispatch(editUserInfoError("User with this ID was not found"));
            toast.error(`User with this ID was not found`)
            return null;
        }
    } catch (error) {
        dispatch(editUserInfoError(error.message));
        toast.error(`Error when changing user data`)

        return null;
    }
}

export const deleteUserFromDatabase = (userId) => async (dispatch) => {
    dispatch(deleteUserInfoRequest());
    try {
        const usersRef = ref(db, 'users');
        const userQuery = query(usersRef, orderByChild('userID'), equalTo(userId));
        const userSnapshot = await get(userQuery);

        if (userSnapshot.exists()) {
            const userKey = Object.keys(userSnapshot.val())[0];
            console.log('userKey', userKey);
            const userRef = ref(db, `users/${userKey}`);

            await remove(userRef);

            dispatch(deleteUserInfoSuccess());
        } else {
            const errorMessage = `User with key ${userId} not found in the database.`;
            dispatch(deleteUserInfoError(errorMessage));
            toast.error(`User not found`)

        }

    } catch (error) {
        const errorMessage = `Error deleting user from database: ${error.message}`;
        dispatch(deleteUserInfoError(errorMessage));
        toast.error(`Error! User not deleted`)

    }
};

export const fetchUserByNickname = (nickname) => async dispatch => {
    dispatch(fetchUserRequest());
    try {
        const usersRef = ref(db, 'users');
        const userQuery = query(usersRef, orderByChild('nickname'), equalTo(nickname));
        const userSnapshot = await get(userQuery);

        if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            const userKey = Object.keys(userData)[0];
            const user = userData[userKey];
            dispatch(fetchUserSuccess(user));
            return user;
        } else {
            dispatch(fetchUserError("Користувача з таким Nickname не знайдено"));
            return null;
        }
    } catch (error) {
        dispatch(fetchUserError(error.message));
        toast.error(`Error! User not found`)

        return null;
    }
};