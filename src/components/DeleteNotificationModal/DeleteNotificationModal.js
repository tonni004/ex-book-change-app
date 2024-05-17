import { Button, Modal, ModalContent } from '@nextui-org/react';
import PropTypes from 'prop-types';

import s from './DeleteNotificationModal.module.scss';

export default function DeleteNotificationModal({ onClick, isOpen, onOpenChangeModal, ad, onOpenChangeEditModal }) {
    const handleClick = () => {
        console.log("DELETE ADDD", ad);
        if (ad !== undefined) {
            console.log('delete ad & ad.id:', ad);

            const adID = ad.id;
            onClick(adID);
            onOpenChangeModal();
        } else {
            console.log('delete user');
            onClick();
            onOpenChangeModal();
            onOpenChangeEditModal();
        }

    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChangeModal} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <div className={s.NotificationMessageContainer}>
                            <div className={s.TextContainer}>
                                <p >Are you sure? &#129402;</p>
                                <ul className={s.BtnList}>
                                    <li>
                                        <Button
                                            color='danger'
                                            variant='bordered'
                                            size='sm'
                                            onClick={onClose}
                                        >Close</Button>
                                    </li>
                                    <li>
                                        <Button
                                            color='danger'
                                            size='sm'
                                            onClick={handleClick}
                                        >Delete</Button>
                                    </li>
                                </ul>
                            </div>
                        </div >)}
                </ModalContent>
            </Modal>
        </>
    )
}

DeleteNotificationModal.propTypes = {
    onClick: PropTypes.func,
    isOpen: PropTypes.bool,
    onOpenChangeModal: PropTypes.func,
    ad: PropTypes.object,
    onOpenChangeEditModal: PropTypes.func,
}