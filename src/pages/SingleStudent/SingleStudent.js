import React from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../../components/shared/Loading';
import useGetStudentById from '../../hooks/useGetUserById';
import AcademicDetails from './AcademicDetails';
import EmploymentDetails from './EmploymentDetails';
import OthersDetails from './OthersDetails';
import PersonalDetails from './PersonalDetails';

const SingleStudent = () => {
    const location = useLocation();
    const studentId = location.state;
    const [student, isLoading] = useGetStudentById(studentId);
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className="flex flex-col items-center">
                <img
                    src={student?.personal_info?.photo}
                    alt={student?.name}
                />
                <div>
                    <h3>Name: {student?.name}</h3>
                    <p>Email: {student?.email}</p>
                    <p>Mobile: {student?.mobile}</p>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {
                        student?.personal_info ? <PersonalDetails details={student?.personal_info} /> : <p>Personal Details Not Added</p>
                    }
                    {
                        student?.employment_info ? <EmploymentDetails details={student?.employment_info} /> : <p>Employment Details Not Added</p>
                    }
                    {
                        student?.academic_info ? <AcademicDetails details={student?.academic_info} /> : <p>Academic Details Not Added</p>
                    }
                    {
                        student?.others_info ? <OthersDetails details={student?.others_info} /> : <p>Emmmergency Contact Details Not Added</p>
                    }



                </div>
            </div>
        </div>
    );
};

export default SingleStudent;