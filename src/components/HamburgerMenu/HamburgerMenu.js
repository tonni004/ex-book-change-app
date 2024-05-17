import { useCallback, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfo } from '../../redux/user/user-operations';
import EditUserInfoForm from '../../components/EditUserInfoForm/EditUserInfoForm';
import { getUserId } from '../../redux/user/user-selectors';
import { logout, deleteCurrentUser } from '../../api-functions/api-functions';
import { deleteUserFromDatabase } from "../../redux/user/user-operations";

import s from './HamburgerMenu.module.scss';

export default function HamburgerMenu() {
    const dispatch = useDispatch();
    const userID = useSelector(getUserId);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isChecked, setIsChecked] = useState(false);

    const onLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch])

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
                    </li>
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

