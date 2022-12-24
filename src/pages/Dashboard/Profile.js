import React from 'react';
import Loading from '../../components/shared/Loading';
import useGetSingleUser from '../../hooks/useGetSingleUser';

const Profile = () => {
    const token = localStorage.getItem('authToken');
    
    const [student, isLoading] = useGetSingleUser(token);
    if(isLoading){
        return <Loading/>
    }
    console.log(student)
    return (
        <div>
            dfadf
        </div>
    );
};

export default Profile;