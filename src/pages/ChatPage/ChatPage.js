import { useEffect, useState, useCallback, useRef } from "react";
import {
    Button,
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    useDisclosure,
    ScrollShadow
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import { Container } from "../../components/Container/Container";
import HumburgerMenu from '../../components/HamburgerMenu';
import { searchChatById, sendNewMessage, listenToMessages } from '../../redux/chats/chats-operations';
import { getCurrentChat } from "../../redux/chats/chats-selectors";
import { getUserNickname } from '../../redux/auth/auth-selectors';
import { getFavouritesAds } from '../../redux/ads/ads-selectors';
import NoSearchImg from "../../images/no-search-result.webp";
import s from './ChatPage.module.scss';
import { searchAdsById } from "../../redux/ads/ads-operations";

export default function ChatPage() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch = useDispatch();
    const location = useLocation();
    const currentChat = useSelector(getCurrentChat);
    const authUserNickname = useSelector(getUserNickname);
    const currentAd = useSelector(getFavouritesAds);
    const [chatID, setChatID] = useState('');
    const [message, setMessage] = useState('');
    const [ad, setAd] = useState({});
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

        if (message !== "") {
            dispatch(sendNewMessage(newMessage, chatID));
            reset();
        }
    }

    const onChatHeaderClick = () => {
        const ad = currentAd[0];
        setAd(ad);
        onOpenChange();
    };

    const getCurrencySymbol = (currencyCode) => {
        switch (currencyCode) {
            case 'USD':
                return '\u0024';
            case 'EUR':
                return '\u20AC';
            case 'UAH':
                return '\u20b4';
            default:
                return '';
        }
    }

    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const chatID = pathParts[pathParts.length - 1];
        setChatID(chatID);
        dispatch(searchChatById(chatID));
    }, [dispatch, location.pathname]);

    useEffect(() => {
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

    useEffect(() => {
        if (currentChat) {
            dispatch(searchAdsById(currentChat.adID));
        }
    }, [currentChat])

    return (
        <>
            <HumburgerMenu buttonType={"chat page"} />
            {currentChat ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <button className={s.ChatHeader} onClick={onChatHeaderClick}>
                        <img className={s.ChatImage} src={currentChat.imageURL} alt={currentChat.title} width={70} height={70} />
                        <div className={s.ChatInfoField}>
                            <h3>{currentChat.title}</h3>
                            <p>chat with <a className={s.OtherUserLink} href={`/profile/${authUserNickname === currentChat.users.user ? currentChat.users.adsAuther : currentChat.users.user}`}>@{authUserNickname === currentChat.users.user ? currentChat.users.adsAuther : currentChat.users.user}</a></p>
                        </div>
                    </button>

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

            {/* Modal Ad from current chat */}

            <Modal isOpen={isOpen} backdrop='blur' size="full" placement='top-center' onOpenChange={onOpenChange}>

                <ModalContent className={s.CardModal}>
                    {(onClose) => (
                        <><ScrollShadow size={100} className="w-[300px] h-[400px]">
                            <Container>
                                <ModalBody>
                                    <div>
                                        <h2>{ad.title}</h2>
                                        <p className={s.AdDescription}>{ad.description}</p>
                                        <p className={s.AdLinkField}>Created by <a href={`/profile/${ad.adAuther}`} className={s.AdAutherLink}>{ad.adAuther}</a></p>
                                        <p className={s.AdPrice}>Price {ad.price} <span>{getCurrencySymbol(ad.currency)}</span></p>
                                    </div>
                                </ModalBody>
                                <ModalFooter className={s.BtnField}>
                                    <Button color='white' size="lg" variant="ghost" onPress={onClose}>Close</Button>
                                </ModalFooter>
                            </Container>
                        </ScrollShadow>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
