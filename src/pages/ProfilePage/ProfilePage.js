import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import AdTemplate from '../../components/AdTemplate/AdTemplate';
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import DeleteNotificationModal from '../../components/DeleteNotificationModal';
import UserProfileTemplate from '../../components/UserProfileTemplate';
import s from './ProfilePage.module.scss';

// operations
import { searchUserAds, fetchFavouritesAds } from '../../redux/ads/ads-operations';
import { fetchUserByID } from "../../redux/user/user-operations";
// selectors
import { getFavouritesAds, getFetchUserAds } from '../../redux/ads/ads-selectors';
import { getUser } from '../../redux/user/user-selectors';
import { getUserID, getUserNickname } from '../../redux/auth/auth-selectors';




export default function ProfilePage() {
    const dispatch = useDispatch();
    const userInfo = useSelector(getUser);
    const userID = useSelector(getUserID);
    const userNickname = useSelector(getUserNickname);
    const fetchUserAds = useSelector(getFetchUserAds);
    const favouritesAds = useSelector(getFavouritesAds);
    const [selected, setSelected] = useState("allAds");

    useEffect(() => {
        dispatch(fetchUserByID(userID));
        dispatch(fetchFavouritesAds(userID));
        dispatch(searchUserAds(userNickname));
    }, [dispatch, userID, userNickname]);


    return (
        <>
            <HamburgerMenu buttonType={"profile page"} />
            <DeleteNotificationModal />
            <UserProfileTemplate
                imageURL={userInfo.imageURL}
                name={userInfo.name}
                nickname={userNickname}
                description={userInfo.description}
                location={userInfo.location}
            />

            <div className="flex w-full flex-col">
                <Tabs
                    aria-label="Options"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                    color="danger"
                    radius='lg'
                    variant='light'
                    size='lg'
                    className={s.TabsFields}
                >
                    <Tab key="allAds" title="All ads">
                        <div>
                            {fetchUserAds.length !== 0
                                ? <motion.div
                                    initial={{ opacity: 0, y: '30px' }}
                                    animate={{ opacity: 1, y: '0px' }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <AdTemplate fetchAds={fetchUserAds} />
                                </motion.div>
                                : <p className={s.EmptyAdsField}>No ads</p>
                            }
                        </div>
                    </Tab>
                    <Tab key="favoriteAds" title="Favourites">
                        <div>
                            {favouritesAds.length !== 0
                                ? <AdTemplate fetchAds={favouritesAds} />
                                : <p className={s.EmptyAdsField}>No favourites ads</p>
                            }
                        </div>
                    </Tab>

                </Tabs>
            </div>


        </>
    )
}