import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getUserID } from '../../redux/auth/auth-selectors';
import { fetchUserChats } from '../../redux/chats/chats-operations';
import { getUserChats } from '../../redux/chats/chats-selectors';
import NoSearchImg from "../../images/no-search-result.webp";

import s from './MessagePage.module.scss';

export default function MessagePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector(getUserID);
    const userChats = useSelector(getUserChats);
    const [chats, setChats] = useState([]);

    const truncateMessage = (message, maxLength) => {
        if (message.length > maxLength) {
            return message.slice(0, maxLength) + '...';
        }
        return message;
    };

    const getLastMessage = (messages) => {
        if (!messages) {
            return null;
        }
        const messagesArray = Object.values(messages);
        if (messagesArray.length === 0) {
            return null;
        }
        messagesArray.sort((a, b) => new Date(a.time) - new Date(b.time));
        return messagesArray[messagesArray.length - 1];
    };

    const onChatNavigate = (chatId) => {
        navigate(`/message/${chatId}`);
    };

    useEffect(() => {
        dispatch(fetchUserChats(userId))
    }, [dispatch, userId])

    useEffect(() => {
        if (userChats) {
            const messagesArray = Object.values(userChats);
            setChats(messagesArray);
        }
    }, [userChats])
    return (
        <>
            {chats.length > 0
                ? <motion.ul
                    className={s.ChatList}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {chats.map(chat => {
                        const lastMessage = getLastMessage(chat.messages);
                        return (

                            <li key={chat.id} className={s.ChatItem}>
                                <button
                                    className={s.ChatButton}
                                    onClick={() => onChatNavigate(chat.id)}
                                >
                                    <img className={s.ChatImage} src={chat.imageURL} alt={chat.title} width='70' height='70' />
                                    <div>
                                        <h3 className={s.ChatTitle}>{chat.title}</h3>
                                        {lastMessage && (
                                            <p className={s.ChatLastMessage}>
                                                {truncateMessage(lastMessage.message, 40)}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            </li>
                        )
                    })}
                </motion.ul>

                : <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={s.NotFoundImg}
                    src={NoSearchImg}
                    alt="No search results"
                    width={400} height={300} />
            }
        </ >
    )
}

