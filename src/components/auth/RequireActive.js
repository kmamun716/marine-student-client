import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import useGetSingleUser from '../../hooks/useGetSingleUser';
import Loading from '../shared/Loading';

const RequireActive = ({ children }) => {
    const authToken = localStorage.getItem("authToken");
    const [student, isLoading] = useGetSingleUser(authToken);
    let location = useLocation();
    if (isLoading) {
        return <Loading />
    }
    if (student?.status !== 'active') {
        toast.warning('Authorized Access Only!')
        localStorage.removeItem('authToken')
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireActive;