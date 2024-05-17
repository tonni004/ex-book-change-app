// import s from './RegisterPage.module.scss';
import { useCallback } from 'react';
import { motion } from 'framer-motion';
import StyledContainer from '../../components/StyledContainer';
import Form from '../../components/Form/Form';
import { useDispatch } from 'react-redux';
import { createUser } from '../../api-functions/api-functions';

export default function RegisterPage() {
    // const { createUser } = UserAuth();
    const dispatch = useDispatch();

    const onSighUp = useCallback((email, password, nickname) => {
        dispatch(createUser(email, password, nickname))
    }, [dispatch])

    return (
        <StyledContainer>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}

            >
                <Form
                    title="Register"
                    text="Already have an account?"
                    route="/login"
                    linkTitle="LogIn"
                    inputName={true}
                    btnTitle='SignUp'
                    onSubmit={onSighUp}
                />
            </motion.div>
        </StyledContainer>
    )
}