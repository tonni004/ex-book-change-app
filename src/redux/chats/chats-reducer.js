import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
    addChatSuccess,
    addChatError,
    searchChatByIdSuccess,
    searchChatByIdError,
    addMessageSuccess,
    addMessageError,
    updateMessages,
    searchAllChatsSuccess,
} from './chats-actions';

const initialState = [];

const userChats = createReducer(initialState, builder => {
    builder
        .addCase(addChatSuccess, (state, { payload }) => {
            return [...state, payload];
        })
        .addCase(searchAllChatsSuccess, (_, { payload }) => {
            return { ...payload };
        })
    // .addCase(deleteChatSuccess, (state, { payload }) => {
    //     const updatedState = state.filter(ad => ad.id !== payload);
    //     return updatedState;
    // })
    // .addCase(CLEAR_CHATS_INFO, () => initialState)

});

const currentChat = createReducer({}, builder => {
    builder
        .addCase(searchChatByIdSuccess, (_, { payload }) => {
            return { ...payload };
        })
        .addCase(addMessageSuccess, (state, { payload }) => {
            return {
                ...state,
                chatData: {
                    ...state.chatData,
                    messages: {
                        ...state.chatData.messages,
                        [payload.id]: payload
                    }
                }
            };
        })
        .addCase(updateMessages, (state, { payload }) => {

            return {
                ...state,
                chatData: {
                    ...state.chatData,
                    messages: {
                        ...payload
                    }
                }
            };
        });
});


const setError = (_, { payload }) => payload;

const error = createReducer(null, (builder) => {
    builder
        // .addCase(fetchChatssError, setError,)
        .addCase(addChatError, setError)
        .addCase(searchChatByIdError, setError)
        .addCase(addMessageError, setError)
    // .addCase(fetchAdsByUserError, setError)
    // .addCase(deleteAdError, setError)
    // .addCase(addToFavouritesError, setError)

})

export default combineReducers({
    userChats,
    currentChat,
    error,
})