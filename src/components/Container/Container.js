import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import s from './Container.module.scss';

export const Container = ({ children, IsAuthenticated }) => {
    const [isAuthenticatedStyle, setIsAuthenticatedStyle] = useState(false);

    useEffect(() => {
        if (IsAuthenticated) {
            setIsAuthenticatedStyle(true);
        } else {
            setIsAuthenticatedStyle(false);
        }
    }, [IsAuthenticated]);

    return (
        <div className={`${s.Container} ${isAuthenticatedStyle ? s.authenticated : ''}`}>
            {children}
        </div>
    );
};

Container.propTypes = {
    IsAuthenticated: PropTypes.bool,
}