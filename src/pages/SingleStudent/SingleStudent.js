import React from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../../components/shared/Loading';
import useGetStudentById from '../../hooks/useGetUserById';

const SingleStudent = () => {
    const location = useLocation();
    const studentId = location.state;
    const [student, isLoading] = useGetStudentById(studentId);
    if(isLoading){
        return <Loading/>
    }
    console.log(student)
    return (
        <div>
            
        </div>
    );
};

export default SingleStudent;