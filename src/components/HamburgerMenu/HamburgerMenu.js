import { useCallback, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfo } from '../../redux/user/user-operations';
import EditUserInfoForm from '../../components/EditUserInfoForm/EditUserInfoForm';
import { getUserId } from '../../redux/user/user-selectors';
import { logout, deleteCurrentUser } from '../../api-functions/api-functions';
import { deleteChatById } from '../../redux/chats/chats-operations';
import { getCurrentChat } from '../../redux//chats/chats-selectors';

import s from './HamburgerMenu.module.scss';
import { useNavigate } from "react-router-dom";
import DeleteNotificationModal from "../DeleteNotificationModal";

export default function HamburgerMenu(buttonType) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userID = useSelector(getUserId);
    const currentChat = useSelector(getCurrentChat);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isChecked, setIsChecked] = useState(false);

    const onLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch])


    const onDeleteChat = useCallback(() => {
        const chatInfo = {
            chatId: currentChat.id,
            adsAuther: currentChat.users.adsAuther,
            user: currentChat.users.user,

        }
        console.log('chatInfo', chatInfo);

        dispatch(deleteChatById(chatInfo));
        navigate('/message');
    }, [dispatch, currentChat])

    const onEditUserInfo = useCallback((updateUserInfo) => {
        dispatch(editUserInfo(userID, updateUserInfo));
    }, [dispatch, userID]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const onDeleteUser = useCallback(() => {
        dispatch(deleteCurrentUser());
    }, [dispatch])

    return (
        <>
            <div className={s.MenuBtn} >
                <label htmlFor="check" className={s.BtnField}>
                    <input type="checkbox" id="check" checked={isChecked} onChange={handleCheckboxChange} />
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <div className={`${s.MenuField} ${isChecked ? s.open : ''}`}>
                <div className={s.MenuBackground}></div>
                <ul className={s.BtnList}>
                    {buttonType === "profile page"
                        ? (<>
                            <li>
                                <Button
                                    color="danger"
                                    variant="bordered"
                                    size="sm"
                                    onClick={onOpen}
                                >Edit</Button>
                            </li>

                            <li>
                                <Button
                                    color="danger"
                                    size="sm"
                                    onClick={onLogout}>Logout
                                </Button>
                            </li></>)
                        : <Button
                            color="danger"
                            size="sm"
                            onClick={onDeleteChat}>Delete Chat
                        </Button>
                    }

                </ul>
            </div>

            <EditUserInfoForm
                isOpenModal={isOpen}
                onOpenChangeEditModal={onOpenChange}
                onSubmit={onEditUserInfo}
                onDeleteUser={onDeleteUser}
            />
        </>

    )
}

