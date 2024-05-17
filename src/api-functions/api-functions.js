import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';
import { getAuth, deleteUser } from "firebase/auth";
import { addNewUser } from '../redux/user/user-operations';
import {
    registerRequest,
    registerSuccess,
    registerError,
    loginRequest,
    loginSuccess,
    loginError,
    logoutRequest,
    logoutSuccess,
    logoutError,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserError,
} from '../redux/auth/auth-actions';
import {
    clearUserInfo,
    deleteUserInfoError
} from '../redux/user/user-actions';
import { deleteUserFromDatabase } from '../redux/user/user-operations';
import { toast } from 'react-toastify';



export const createUser = (email, password, nickname) => async dispatch => {
    dispatch(registerRequest());

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: nickname,
        });

        dispatch(addNewUser({ nickname: nickname, userID: user.uid }));
        dispatch(registerSuccess({ userID: user.uid, userNickname: user.displayName }));
    } catch (error) {
        const errorMessage = error.message;
        dispatch(registerError(errorMessage));
        toast.error(`Error! User not created`)

    }
};

export const signIn = (email, password) => async dispatch => {
    dispatch(loginRequest());
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        dispatch(loginSuccess({ userID: user.uid, userNickname: user.displayName }));
    } catch (error) {
        const errorMessage = error.message;
        dispatch(loginError(errorMessage));
        toast.error(`Error! User not autorizated`)
    }
}


export const logout = () => async dispatch => {
    dispatch(logoutRequest());
    try {
        await signOut(auth);
        dispatch(logoutSuccess());
        dispatch(clearUserInfo());
    }
    catch (error) {
        const errorMessage = error.message;
        dispatch(logoutError(errorMessage));
        toast.error(`Error! User not logout`)

    }
}

export const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log("unsubscribe");
});


export const deleteCurrentUser = () => async (dispatch) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        dispatch(deleteUserInfoError("User is not logged in"));
        return;
    }

    const userId = user.uid;

    dispatch(deleteUserRequest());

    try {
        await dispatch(deleteUserFromDatabase(userId));

        await deleteUser(user);

        dispatch(deleteUserSuccess());
        dispatch(clearUserInfo());
    } catch (error) {
        dispatch(deleteUserError(error.message));
        toast.error(`Error! User not deleted`)

    }
};



// [START auth_send_email_verification_modular]
// import { getAuth, sendEmailVerification } from "firebase/auth";

// // const auth = getAuth();
// sendEmailVerification(auth.currentUser)
//     .then(() => {
//         // Email verification sent!
//         // ...
//     });
// [END auth_send_email_verification_modular]

//import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// const auth = getAuth();
// sendPasswordResetEmail(auth, email)
//     .then(() => {
//         // Password reset email sent!
//         // ..
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//     });

