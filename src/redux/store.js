import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import {
    persistStore,
    persistReducer,
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";

import userInfo from './user/user-reducer';
import auth from './auth/auth-reducer';
import ads from './ads/ads-reducer';
import chats from './chats/chats-reducer';

// const authPersistConfig = {
//     key: 'auth',
//     storage,
// }

const authPersistConfig = {
    key: 'auth',
    storage,
}


const rootReduser = combineReducers({
    user: userInfo,
    auth: persistReducer(authPersistConfig, auth),
    ads: ads,
    chats: chats,
})

export const store = configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(logger),
    devTools: process.env.NODE_ENV === 'development',
})

export const persistor = persistStore(store);