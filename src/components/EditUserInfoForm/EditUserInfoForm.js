import { useCallback, useState, useEffect, useRef } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@nextui-org/react";
import { uploadFile } from "../../firebase";
import { getUserNickname } from '../../redux/auth/auth-selectors';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/user/user-selectors";
import DeleteNotificationModal from "../DeleteNotificationModal";
import PhotoCamera from '../../images/photo-camera.svg';
import PropTypes from 'prop-types';


import s from './EditUserInfoForm.module.scss';
import { ReactSVG } from "react-svg";


export default function EditUserInfoForm({ isOpenModal, onOpenChangeEditModal, onSubmit, onDeleteUser }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalPlacement, setModalPlacement] = useState("center");
    const [backdrop, setBackdrop] = useState('blur');
    const userInfo = useSelector(getUser);
    const userNickname = useSelector(getUserNickname);
    const fileInputRef = useRef(null);

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    // const [gender, setGender] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [imageURL, setImageURL] = useState('');


    const handleFormClose = () => {
        if (userInfo.imageURL !== "" && userInfo.imageURL !== imageURL) {
            setImageURL(userInfo.imageURL);
            console.log("Old img", imageURL);
        }
        onOpenChangeEditModal();
    };
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onChangeFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            uploadImage(selectedFile);
        }
    }

    const uploadImage = async (file) => {
        const storageFolder = 'profileImages';

        try {
            const image = await uploadFile(storageFolder, file);
            return setImageURL(image)

        } catch (error) {
            console.error('Error uploading file:', error);
            return;
        }
    }

    const onUpdateInfo = useCallback(async () => {
        const nickname = userNickname;

        const userInfo = {
            name: name,
            nickname: nickname,
            // gender: gender,
            description: description,
            location: location,
            imageURL: imageURL,
        }

        onSubmit(userInfo);
        onOpenChangeEditModal();
    }, [onSubmit, name, description, location, onOpenChangeEditModal, imageURL])


    useEffect(() => {
        setNickname(userNickname);

        if (userInfo.name !== undefined) {
            setName(userInfo.name);
        }
        if (userInfo.imageURL !== "" && userInfo.imageURL !== undefined) {
            setImageURL(userInfo.imageURL);
        }
        if (userInfo.description !== undefined) {
            setDescription(userInfo.description);
        }
        if (userInfo.location !== undefined) {
            setLocation(userInfo.location);
        }
    }, [userInfo]);

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
                            <ModalBody>
                                <p>What the time is it? &#129300;<br /> Time to update information about yourself!</p>

                                <div className={s.UserAvatarField}>
                                    <button onClick={handleButtonClick} className={s.FileInputBtn} type='button'>
                                        {imageURL === ""
                                            ? <img src='https://firebasestorage.googleapis.com/v0/b/bookshop-app-26c08.appspot.com/o/profileImages%2Favatar-15.png?alt=media&token=46022054-1340-41e0-852e-df0c15271c82' alt="Default avatar" />
                                            : <img src={imageURL} alt="User avatar" />
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
                                    label="Your Name"
                                    value={name}
                                    onValueChange={setName}
                                />
                                <Input
                                    isDisabled
                                    type="text"
                                    label="Nickname"
                                    value={nickname}
                                    onValueChange={setNickname}
                                />
                                {/* <Dropdown>
                                    <DropdownTrigger>
                                        <Button
                                            variant="bordered"
                                            className="capitalize"
                                        >Gender: {gender}
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="User gender"
                                        variant="flat"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        selectedKeys={gender.currentKey}
                                        onSelectionChange={setGender}
                                    >
                                        <DropdownItem key="Male">Male</DropdownItem>
                                        <DropdownItem key="Female">Female</DropdownItem>
                                        <DropdownItem key="Non-binary">Non-binary</DropdownItem>
                                        <DropdownItem key="Agender">Agender</DropdownItem>
                                        <DropdownItem key="Other">Other</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown> */}

                                <Input
                                    type="text"
                                    label="Location: country, city"
                                    value={location}
                                    onValueChange={setLocation}
                                />

                                <Textarea
                                    label="Description"
                                    placeholder="Enter your description"
                                    value={description}
                                    onValueChange={setDescription}

                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onOpen}>
                                    Delete user
                                </Button>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onClick={onUpdateInfo}>
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
                onOpenChangeEditModal={onOpenChangeEditModal}
                onClick={onDeleteUser} />
        </>
    )
}

EditUserInfoForm.propTypes = {
    onSubmit: PropTypes.func,
    isOpenModal: PropTypes.bool,
    onOpenChangeEditModal: PropTypes.func,
    onDeleteAd: PropTypes.func,
}


