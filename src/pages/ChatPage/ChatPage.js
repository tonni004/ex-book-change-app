import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import { searchChatById, sendNewMessage, listenToMessages } from '../../redux/chats/chats-operations';
import { getCurrentChat } from "../../redux/chats/chats-selectors";
import { getUserNickname } from '../../redux/auth/auth-selectors';
import NoSearchImg from "../../images/no-search-result.webp";
import s from './ChatPage.module.scss';

export default function ChatPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const currentChat = useSelector(getCurrentChat);
    const authUserNickname = useSelector(getUserNickname);
    const [chatID, setChatID] = useState('');
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const reset = () => {
        setMessage('');
    };

    const handleChange = useCallback((e) => {
        setMessage(e.target.value);
    }, []);

    const onSendMessage = () => {
        const time = new Date().toLocaleString();
        const newMessage = {
            message: message,
            user: authUserNickname,
            time: time,
            status: false,
        };
        console.log('newMessage', newMessage);
        if (message !== "") {
            dispatch(sendNewMessage(newMessage, chatID));
            reset();
        }
    }

    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const chatID = pathParts[pathParts.length - 1];
        setChatID(chatID);
        dispatch(searchChatById(chatID));
    }, [dispatch, location.pathname]);

    useEffect(() => {
        console.log('currentChat', currentChat);
        if (currentChat && currentChat.messages !== null && currentChat.messages !== undefined) {
            const messagesArray = Object.values(currentChat.messages);
            setChatMessages(messagesArray);
        }
    }, [currentChat]);

    useEffect(() => {
        if (chatID && currentChat) {
            listenToMessages(chatID, dispatch);
        }
    }, [chatID, dispatch]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    return (
        <>
            {currentChat ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={s.ChatHeader}>
                        <img className={s.ChatImage} src={currentChat.imageURL} alt={currentChat.title} width={70} height={70} />
                        <div className={s.ChatInfoField}>
                            <h3>{currentChat.title}</h3>
                            <p>chat with <a className={s.OtherUserLink} href={`/profile/${authUserNickname === currentChat.users.user ? currentChat.users.adsAuther : currentChat.users.user}`}>@{authUserNickname === currentChat.users.user ? currentChat.users.adsAuther : currentChat.users.user}</a></p>
                        </div>
                    </div>

                    {chatMessages.length > 0 ? (
                        <div className={s.ScrollShadowContainer}>
                            <ul className={s.ChatList}>
                                {chatMessages.map((message, index) => (
                                    <li
                                        className={`${s.ChatItem} ${message.user === authUserNickname ? s.MyMessage : s.OtherMessage}`}
                                        key={index}>
                                        <div className={`${message.user === authUserNickname ? s.MyMessageStyle : s.OtherMessageStyle}`}>
                                            <p className={s.MessageText}>{message.message}</p>
                                            <span className={s.MessageTime}>{message.time.split(", ")[1].split(":").slice(0, 2).join(":")}</span>
                                        </div>
                                    </li>
                                ))}
                                <div ref={messagesEndRef} />
                            </ul>
                        </div>
                    ) : (
                        <div className={s.FildWithoutMessage}></div>
                    )}

                    <div className={s.InputField}>
                        <textarea
                            value={message}
                            onChange={handleChange}
                            placeholder="Send a message.."
                            className={s.Textarea}
                        />
                        <button className={s.SendBtn} type='submit' onClick={onSendMessage}>&#8593;</button>
                    </div>
                </motion.div>
            ) : (
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={s.NotFoundImg}
                    src={NoSearchImg}
                    alt="No search results"
                    width={400} height={300} />
            )}
        </>
    );
}
