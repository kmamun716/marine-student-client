import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useGetSingleUser from "../../hooks/useGetSingleUser";
import Loading from "../shared/Loading";

const RequireAdmin = ({ children }) => {
    const authToken = localStorage.getItem("authToken");
    const [student, isLoading] = useGetSingleUser(authToken);
    let location = useLocation();
    if (isLoading) {
        return <Loading />
    }
    if (student?.role === 'moderator' || student?.role === 'admin') {
        return children;
    }
    toast.warning('Authorized Access Only!')
    localStorage.removeItem('authToken')
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAdmin;
