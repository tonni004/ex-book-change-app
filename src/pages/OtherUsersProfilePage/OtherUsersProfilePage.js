import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdTemplate from '../../components/AdTemplate';
import { fetchUserByNickname } from '../../redux/user/user-operations';
import { searchUserAds, fetchFavouritesAds } from '../../redux/ads/ads-operations';
import { getUser } from "../../redux/user/user-selectors";
import { getUserID } from "../../redux/auth/auth-selectors";
import { getFetchUserAds } from '../../redux/ads/ads-selectors';
import UserProfileTemplate from '../../components/UserProfileTemplate';
import s from './OtherUsersProfile.module.scss';


export default function OtherUsersProfilePage() {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const authUserID = useSelector(getUserID);
    const fetchUserAds = useSelector(getFetchUserAds);
    const [selected, setSelected] = useState("allAds");
    const [userNickname, setUserNickname] = useState('');

    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const userNickname = pathParts[pathParts.length - 1];
        setUserNickname(userNickname);

        dispatch(fetchUserByNickname(userNickname));
        dispatch(searchUserAds(userNickname));
        dispatch(fetchFavouritesAds(authUserID));
    }, [dispatch, location])
    return (
        <>
            <UserProfileTemplate
                imageURL={user.imageURL}
                name={user.name}
                nickname={userNickname}
                description={user.description}
                location={user.location}
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
                    <Tab key="allAds" title={`${user.name}'s ads`}>
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
                    {/* <Tab key="favoriteAds" title={`${user.name}'s favourites ads`}>
                        <div>
                            {favouritesAds.length !== 0
                                ? <AdTemplate fetchAds={favouritesAds} />
                                : <p className={s.EmptyAdsField}>No favourites ads</p>
                            }
                        </div>
                    </Tab> */}

                </Tabs>
            </div>


        </>
    )
}