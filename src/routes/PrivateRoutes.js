import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../redux/auth/auth-selectors';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
export default function PrivateRoute({ children }) {
    const isAuthenticated = useSelector(getIsAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to='/' />;
    }
    return children;
};

