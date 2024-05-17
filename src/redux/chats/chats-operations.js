import { getDatabase, ref, get, push, set, query, orderByChild, equalTo, onValue } from "firebase/database";
import { toast } from 'react-toastify';
import {
    addChatRequest,
    addChatSuccess,
    addChatError,
    addToUserChatsRequest,
    addToUserChatsError,
    searchChatByIdRequest,
    searchChatByIdSuccess,
    searchChatByIdError,
    addMessageRequest,
    addMessageSuccess,
    addMessageError,
    updateMessages,
    fetchUserChatsRequest,
    fetchUserChatsSuccess,
    fetchUserChatsError,
    searchAllChatsRequest,
    searchAllChatsSuccess,
    searchAllChatsError,

} from './chats-actions';

const db = getDatabase();


export const addNewChat = ({ chatTitle, autherNickname, userNickname, imageURL }) => async dispatch => {
    dispatch(addChatRequest());

    const chatRef = ref(db, 'chats/');
    const newChatRef = push(chatRef);
    const chatID = newChatRef.key;

    const newChat = {
        id: chatID,
        title: chatTitle,
        users: {
            adsAuther: autherNickname,
            user: userNickname,
        },
        imageURL: imageURL,
        messages: [],
    };

    try {
        await set(newChatRef, newChat)
        dispatch(addChatSuccess(newChat));
        dispatch(addToUserChats(autherNickname, chatID));
        dispatch(addToUserChats(userNickname, chatID));
        dispatch(searchChatById(chatID));

        return chatID;
    } catch (error) {
        dispatch(addChatError(error.message));
        toast.error(`Error! New chat not created`)

    }
}

export const addToUserChats = (userNickname, chatId) => async dispatch => {
    dispatch(addToUserChatsRequest());
    try {
        const usersRef = ref(db, 'users');
        const userQuery = query(usersRef, orderByChild('nickname'), equalTo(userNickname));
        const userSnapshot = await get(userQuery);

        if (userSnapshot.exists()) {
            const userKey = Object.keys(userSnapshot.val())[0];
            const userChatsRef = ref(db, `users/${userKey}/userChats/${chatId}`);

            await set(userChatsRef, true);
        } else {
            dispatch(addToUserChatsError("User not found."));
        }
    } catch (error) {
        dispatch(addToUserChatsError(error.message));
        toast.error(`Error! User has not been added to the chat`)
    }
};


export const searchChatById = (id) => async (dispatch) => {
    dispatch(searchChatByIdRequest());
    const searchChatRef = ref(db, `chats/${id}`);

    try {
        const snapshot = await get(searchChatRef);
        const chatData = snapshot.val();

        if (chatData) {
            const matchingChats = { chatData };
            dispatch(searchChatByIdSuccess(matchingChats));
        } else {
            const errorMessage = "Chat with this ID not found";
            dispatch(searchChatByIdError(errorMessage));
        }
    } catch (error) {
        dispatch(searchChatByIdError(error.message));
        toast.error(`Error! Chat not found`)

    }
};

export const sendNewMessage = ({ message, time, status = false, user }, chatID) => async dispatch => {
    dispatch(addMessageRequest());
    console.log('chatID', chatID);
    const messageRef = ref(db, `chats/${chatID}/messages`);
    const newMessageRef = push(messageRef);
    const MessageID = newMessageRef.key;

    const newMessage = {
        id: MessageID,
        message: message,
        user: user,
        time: time,
        status: status,
    };

    try {
        await set(newMessageRef, newMessage)
        dispatch(addMessageSuccess(newMessage));
        listenToMessages(chatID, dispatch);

    } catch (error) {
        dispatch(addMessageError(error.message));
        toast.error(`Error! The message was not sent`)

    }
}

export const listenToMessages = (chatID, dispatch) => {
    const messageRef = ref(db, `chats/${chatID}/messages`);

    onValue(messageRef, (snapshot) => {
        const messages = [];
        snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val();
            messages.push(message);
        });
        dispatch(updateMessages(messages));
    });
};

export const fetchUserChats = (userId) => async (dispatch) => {
    dispatch(fetchUserChatsRequest());
    try {
        const usersRef = ref(db, 'users');
        const userQuery = query(usersRef, orderByChild('userID'), equalTo(userId));
        const userSnapshot = await get(userQuery);

        if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            const userKey = Object.keys(userData)[0];
            const userChatsRef = ref(db, `users/${userKey}/userChats`);
            const userChatsSnapshot = await get(userChatsRef);

            if (userChatsSnapshot.exists()) {
                const userChats = userChatsSnapshot.val();
                const chatIds = Object.keys(userChats);

                const chats = await searchAllChatsByIds(chatIds, dispatch);

                if (chats.length > 0) {
                    dispatch(fetchUserChatsSuccess(chats));
                } else {
                    dispatch(fetchUserChatsError('No chats found for the user.'));
                    toast.error(`Error! No chats found for the user`)

                }
            } else {
                dispatch(fetchUserChatsError('User has no favourite chats.'));
                toast.error(`Error! User has no favourite chats`)

            }
        } else {
            dispatch(fetchUserChatsError('User not found.'));
            toast.error(`Error! User not found`)

        }
    } catch (error) {
        dispatch(fetchUserChatsError('Error fetching user chats: ', error));
        toast.error(`Error! Chat not found`)

    }
};

const searchAllChatsByIds = async (ids, dispatch) => {
    dispatch(searchAllChatsRequest());

    try {
        const chatPromises = ids.map(async (id) => {
            const searchChatRef = ref(db, `chats/${id}`);
            const snapshot = await get(searchChatRef);
            return snapshot.val();
        });

        const chats = await Promise.all(chatPromises);

        const matchingChats = chats.filter(chat => chat !== null);

        if (matchingChats.length > 0) {
            dispatch(searchAllChatsSuccess(matchingChats));
        } else {
            const errorMessage = "No chats found with the provided IDs";
            dispatch(searchAllChatsError(errorMessage));
            toast.error(`Error! Chat not found`)
        }
        return matchingChats;
    } catch (error) {
        dispatch(searchAllChatsError(error.message));
        toast.error(`Error! Chat not found`)
        return [];
    }
};