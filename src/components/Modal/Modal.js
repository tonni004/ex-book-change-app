import { useCallback, useState, useRef } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tabs, Tab, Input, Textarea, RadioGroup, Radio } from "@nextui-org/react";
import { addNewAd } from "../../redux/ads/ads-operations";
import { getUserNickname, getIsAuthenticated } from '../../redux/auth/auth-selectors';
import NewAdIcon from '../../images/plus-svgrepo-com.svg';
import { uploadFile } from "../../firebase";
import { ReactSVG } from "react-svg";
import PhotoCamera from '../../images/photo-camera.svg';
import s from './Modal.module.scss';
import { useDispatch, useSelector } from "react-redux";

export default function ModalWindow() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalPlacement, setModalPlacement] = useState("top");
    const [backdrop, setBackdrop] = useState('blur');
    const fileInputRef = useRef(null);
    const userNickname = useSelector(getUserNickname);
    const IsAuthenticated = useSelector(getIsAuthenticated);
    const dispatch = useDispatch();


    const [bookName, setBookName] = useState('');
    const [isbn, setIsbn] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('');
    const [imageURL, setImageURL] = useState('');

    const resetFields = () => {
        setBookName('');
        setIsbn('');
        setDescription('');
        setPrice('');
        setCurrency('');
        setImageURL('');
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

    const handleClick = useCallback((e) => {
        e.preventDefault();
        const adAuther = userNickname;

        const ad = {
            adAuther: adAuther,
            title: bookName,
            isbn: isbn,
            description: description,
            price: price,
            currency: currency,
            imageURL: imageURL,
        }
        dispatch(addNewAd(ad));
        resetFields();
        onOpenChange();
    }, [dispatch, bookName, isbn, description, price, currency])


    return (
        <>
            {IsAuthenticated
                ? <button
                    className={s.ModalBtn}
                    type="button"
                    onClick={onOpen}>
                    <ReactSVG src={NewAdIcon} />
                </button>
                : null}
            <Modal
                isOpen={isOpen}
                backdrop={backdrop}
                placement={modalPlacement}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody>
                                <p>Wooow! Do you have something for us? <br /> Add and exchange ex-books!</p>
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
                                    <Radio value="UAH">
                                        UAH &#x20b4;
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
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onClick={handleClick}>
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )

}
