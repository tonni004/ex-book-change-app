import { useCallback, useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Button,
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    useDisclosure,
    ScrollShadow
} from "@nextui-org/react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { Container } from '../Container/Container';
import EditAdInfoForm from '../EditAdInfoForm';
import s from './AdTemplate.module.scss';

// images icon
import PencilIcon from '../../images/pencil.svg';
import HeartOutline from '../../images/heart-outline.svg';
import HeartColor from '../../images/heart-color.svg';

// operations
import { addToFavorites, editAdInfo, deleteAd, deleteAdFromFavourites } from "../../redux/ads/ads-operations";
import { addNewChat } from '../../redux/chats/chats-operations';
// selectors
import { getFavouritesAds } from '../../redux/ads/ads-selectors';
import { getUserNickname, getUserID } from '../../redux/auth/auth-selectors';

export default function AdTemplate({ fetchAds }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedAd, setSelectedAd] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favouriteAds = useSelector(getFavouritesAds);
    const userNickname = useSelector(getUserNickname);
    const userID = useSelector(getUserID);

    const onOpenEditModal = (item) => {
        setSelectedAd(item)
        setOpenEditModal(true);
    }

    const onOpenCardModal = (item) => {
        setSelectedAd(item)
        onOpen();
    }

    const getCurrencySymbol = (currencyCode) => {
        switch (currencyCode) {
            case 'USD':
                return '\u0024';
            case 'EUR':
                return '\u20AC';
            case 'UAN':
                return '\u20b4';
            default:
                return '';
        }
    }

    const onEditAd = useCallback((id, ad) => {
        dispatch(editAdInfo(id, ad));
        setOpenEditModal(false);
    }, [dispatch]);


    const onDeleteAd = useCallback((adId) => {
        dispatch(deleteAd(adId));
        setOpenEditModal(false);
    }, [dispatch])

    const handleFavouritesClick = useCallback((userId, adId) => {
        const favouritesAd = isInFavourites(adId);
        if (favouritesAd) {
            dispatch(deleteAdFromFavourites(userId, adId));
        } else {

            dispatch(addToFavorites(userId, adId));
        }
    }, [dispatch]);

    const isInFavourites = (adId) => {
        return favouriteAds.some(ad => ad.id === adId);
    };

    const onCreateNewChat = async () => {
        try {
            const newChatInfo = {
                chatTitle: selectedAd.title,
                autherNickname: selectedAd.adAuther,
                userNickname: userNickname,
                imageURL: selectedAd.imageURL,
            }
            const chatID = await dispatch(addNewChat(newChatInfo));
            // setCurrentChatId(dataChat.id)

            if (chatID) {
                navigate(`/message/${chatID}`);
            }


        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className={s.CardsField}>

            <motion.ul
                initial={{ opacity: 0, y: '30px' }}
                animate={{ opacity: 1, y: '0px' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {fetchAds.map((item) => (
                    <li
                        className={s.CardItem}
                        key={item.id}
                    >

                        <Card shadow="sm" isPressable onPress={() => onOpenCardModal(item)} className={s.Card}>
                            {item.adAuther === userNickname ? (
                                <Button
                                    isIconOnly
                                    aria-label="Edit ad"
                                    radius="full"
                                    className={s.IconBtn}
                                    onClick={() => onOpenEditModal(item)}
                                >
                                    <ReactSVG src={PencilIcon} className={s.PencilIcon} />
                                </Button>
                            ) : (
                                <Button
                                    isIconOnly
                                    radius="full"
                                    aria-label="Favorite"
                                    className={s.IconBtn}
                                    onClick={() => handleFavouritesClick(userID, item.id)}
                                >
                                    <ReactSVG src={isInFavourites(item.id) ? HeartColor : HeartOutline} className={s.HeartIcon} />
                                </Button>
                            )}

                            <CardBody className="overflow-visible p-0">

                                {item.imageURL === ""
                                    ? <Image
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        height={300}
                                        alt='Default image'
                                        className={s.AdImage}
                                        src='https://firebasestorage.googleapis.com/v0/b/bookshop-app-26c08.appspot.com/o/adsImages%2Fdefault-image.webp?alt=media&token=06704c5e-deec-4ae9-8403-759c4952a384'
                                    />
                                    : <Image
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        height="300px"
                                        alt='Book image'
                                        className={s.AdImage}
                                        src={item.imageURL}
                                    />
                                }
                            </CardBody>
                            <CardFooter className="text-small justify-between">
                                <div className={s.CardTitle}>
                                    <h3>{item.title}</h3>
                                    <p className="text-black text-tiny">Click to read more</p>
                                </div>
                                <p className="text-default-500">{item.price} {getCurrencySymbol(item.currency)}</p>
                            </CardFooter>
                        </Card>


                    </li>
                ))

                }
            </motion.ul>

            {/* Modal card*/}

            <Modal isOpen={isOpen} backdrop='blur' size="full" placement='top-center' onOpenChange={onOpenChange}>

                <ModalContent className={s.CardModal}>
                    {(onClose) => (
                        <><ScrollShadow size={100} className="w-[300px] h-[400px]">
                            <Container>
                                <ModalBody>
                                    <div>
                                        <h2>{selectedAd.title}</h2>
                                        <p className={s.AdDescription}>{selectedAd.description}</p>
                                        <p className={s.AdLinkField}>Created by <a href={`/profile/${selectedAd.adAuther}`} className={s.AdAutherLink}>{selectedAd.adAuther}</a></p>
                                        <p className={s.AdPrice}>Price {selectedAd.price} <span>{getCurrencySymbol(selectedAd.currency)}</span></p>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color='danger' size="lg" onClick={onCreateNewChat}>Write now</Button>
                                    <Button color='white' size="lg" onPress={onClose}>Close</Button>
                                </ModalFooter>
                            </Container>
                        </ScrollShadow>
                        </>
                    )}
                </ModalContent>
            </Modal>


            {/* Modal for edit ad Information */}
            <EditAdInfoForm
                ad={selectedAd}
                isOpenModal={openEditModal}
                onOpenChangeModal={setOpenEditModal}
                onSubmit={onEditAd}
                onDeleteAd={onDeleteAd}
            />
        </div>
    )
}

AdTemplate.propTypes = {
    fetchAds: PropTypes.arrayOf(PropTypes.object),
}
