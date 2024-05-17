import { useCallback, useState, useEffect, useRef } from "react";
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Radio, RadioGroup } from "@nextui-org/react";
import DeleteNotificationModal from "../DeleteNotificationModal";
import { uploadFile } from "../../firebase";
import s from './EditAdInfo.module.scss';
import { ReactSVG } from "react-svg";
import PropTypes from 'prop-types';
import PhotoCamera from '../../images/photo-camera.svg';

export default function EditAdInfoForm({ isOpenModal, onOpenChangeModal, ad, onSubmit, onDeleteAd }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalPlacement, setModalPlacement] = useState("top");
    const [backdrop, setBackdrop] = useState('blur');
    const fileInputRef = useRef(null);


    const [bookName, setBookName] = useState('');
    const [adAuther, setAdAuther] = useState('');
    const [isbn, setIsbn] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('');
    const [imageURL, setImageURL] = useState('');


    const handleFormClose = () => {
        if (ad.imageURL !== "" && ad.imageURL !== imageURL) {
            setImageURL(ad.imageURL);
            console.log("Old img", imageURL);
        }
        onOpenChangeModal();
    };
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onChangeFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            console.log("selectedFile", selectedFile);
            uploadImage(selectedFile);
        }
    }

    const uploadImage = async (file) => {
        const storageFolder = 'adsImages';

        try {
            const image = await uploadFile(storageFolder, file);
            return setImageURL(image)

        } catch (error) {
            console.error('Error uploading file:', error);
            return;
        }
    }

    const onEditAdInfo = useCallback(async (e) => {
        e.preventDefault();
        const userNickname = adAuther;
        const adID = ad.id;

        const updateAd = {
            adAuther: userNickname,
            title: bookName,
            isbn: isbn,
            description: description,
            price: price,
            currency: currency,
            imageURL: imageURL,
        }
        onSubmit(adID, updateAd);
        onOpenChangeModal();
    }, [onSubmit, ad, adAuther, bookName, isbn, description, price, currency, imageURL, onOpenChangeModal])



    useEffect(() => {
        if (ad) {
            setAdAuther(ad.adAuther);
            setBookName(ad.title);
            setIsbn(ad.isbn);
            setDescription(ad.description);
            setPrice(ad.price);
            setCurrency(ad.currency);
            setImageURL(ad.imageURL);
        }
    }, [ad]);


    return (
        <>
            <Modal
                isOpen={isOpenModal}
                backdrop={backdrop}
                placement={modalPlacement}
                onOpenChange={handleFormClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            {/* <> */}
                            <ModalBody>
                                <p>Create a cool description to help your old book find a new home!</p>
                                <div className={s.AdPhotoField}>
                                    <button onClick={handleButtonClick} className={s.AdFileInputBtn} type='button'>
                                        {imageURL === ""
                                            ? <img src='https://firebasestorage.googleapis.com/v0/b/bookshop-app-26c08.appspot.com/o/adsImages%2Fdefault-image.webp?alt=media&token=06704c5e-deec-4ae9-8403-759c4952a384' alt="Default ad picture" />
                                            : <img src={imageURL} alt="Ad photo" />
                                        }
                                        <ReactSVG className={s.PhotoCameraIcon} src={PhotoCamera} />
                                    </button>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={onChangeFile}
                                    />
                                </div>

                                <Input
                                    type="text"
                                    label="Book & author"
                                    value={bookName}
                                    onValueChange={setBookName}
                                />
                                <Input
                                    type="number"
                                    label="ISBN"
                                    value={isbn}
                                    onValueChange={setIsbn}
                                />
                                <Input
                                    type="number"
                                    label="Price"
                                    value={price}
                                    onValueChange={setPrice}
                                />
                                <RadioGroup label="Currency &#128184; &#128071;"
                                    className={s.RadioGroup}
                                    orientation="horizontal"
                                    color='danger'
                                    value={currency}
                                    onValueChange={setCurrency}

                                >
                                    <Radio value="UAN">
                                        UAN &#x20b4;
                                    </Radio>
                                    <Radio value="USD">
                                        USD &#x24;
                                    </Radio>
                                    <Radio value="EUR">
                                        EUR &#x20ac;
                                    </Radio>
                                </RadioGroup>

                                <Textarea
                                    label="Description"
                                    placeholder="Enter your description"
                                    value={description}
                                    onValueChange={setDescription}
                                />
                            </ModalBody>

                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={onOpen}>
                                    Delete ad
                                </Button>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onClick={onEditAdInfo}>
                                    Update
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <DeleteNotificationModal
                isOpen={isOpen}
                onOpenChangeModal={onOpenChange}
                onClick={onDeleteAd}
                ad={ad} />
        </>
    )
}

EditAdInfoForm.propTypes = {
    onSubmit: PropTypes.func,
    isOpenModal: PropTypes.bool,
    onOpenChangeModal: PropTypes.func,
    ad: PropTypes.object,
    onDeleteAd: PropTypes.func,
}
