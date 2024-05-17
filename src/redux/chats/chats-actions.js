import { createAction } from "@reduxjs/toolkit";

export const addChatRequest = createAction('chats/addChatRequest');
export const addChatSuccess = createAction('chats/addChatSuccess');
export const addChatError = createAction('chats/addChatError');

export const addToUserChatsRequest = createAction('chats/addToUserChatsRequest');
export const addToUserChatsSuccess = createAction('chats/addToUserChatsSuccess');
export const addToUserChatsError = createAction('chats/addToUserChatsError');

export const searchChatByIdRequest = createAction('chats/searchChatByIdRequest');
export const searchChatByIdSuccess = createAction('chats/searchChatByIdSuccess');
export const searchChatByIdError = createAction('chats/searchChatByIdError');


export const addMessageRequest = createAction('chats/addMessageRequest');
export const addMessageSuccess = createAction('chats/addMessageSuccess');
export const addMessageError = createAction('chats/addMessageError');

export const updateMessages = createAction('chats/updateMessages');

export const fetchUserChatsRequest = createAction('chats/fetchUserChatsRequest');
export const fetchUserChatsSuccess = createAction('chats/fetchUserChatsSuccess');
export const fetchUserChatsError = createAction('chats/fetchUserChatsError');

export const searchAllChatsRequest = createAction('chats/searchAllChatsRequest');
export const searchAllChatsSuccess = createAction('chats/searchAllChatsSuccess');
export const searchAllChatsError = createAction('chats/searchAllChatsError');





