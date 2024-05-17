import { useLocation } from "react-router-dom";
import { NotificationIcon } from '../../images/NotificationIcon';
import { Tabs, Tab, Button } from "@nextui-org/react";
import { UserIcon } from '../../images/UserIcon';
import { SearchIcon } from '../../images/SearchIcon';
import ModalWindow from "../Modal/Modal";
import { getIsAuthenticated } from '../../redux/auth/auth-selectors';
import s from './NavigatePanel.module.scss';
import { useSelector } from "react-redux";


export default function NavigatePanel() {
    const isAuthenticated = useSelector(getIsAuthenticated);
    const { pathname } = useLocation();
    const isProfileActive = pathname.startsWith("/profile");

    return (
        <>
            {isAuthenticated ?
                (<div className={s.TabsField}>
                    <div className={s.TabsFieldWithModal}>
                        <Tabs
                            selectedKey={isProfileActive ? "/profile" : pathname}
                            aria-label="Tabs  colors"
                            variant="light"
                            className={s.TabsBtn}
                            color="default"
                            key='secondary'
                            size="lg"
                        >
                            <Tab id="/search" href="/search" title={<SearchIcon />} key="/search" className={s.Tab} />
                            <Tab id="/message" href="/message" key="/message" title={<NotificationIcon />} />
                            <Tab id="/profile" href='/profile' title={<UserIcon />} key="/profile" radius='full'></Tab>
                        </Tabs>
                        <ModalWindow />
                    </div>
                </div >)
                : null
            }

        </>
    )

}
