// import s from './LoginPage.module.scss';
import { motion } from 'framer-motion';
import StyledContainer from '../../components/StyledContainer';
import Form from '../../components/Form/Form';
import { signIn } from '../../api-functions/api-functions';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

export default function LoginPage() {
    const dispatch = useDispatch();

    const onSignIn = useCallback((email, password) => {
        dispatch(signIn(email, password))
    }, [dispatch])

    return (
        <StyledContainer>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}

            >
                <Form
                    title="Login"
                    text="Don't have an account?"
                    route='/register'
                    linkTitle="SignUp"
                    btnTitle='SignIn'
                    onSubmit={onSignIn}
                />
            </motion.div>
        </StyledContainer>
    )
}
