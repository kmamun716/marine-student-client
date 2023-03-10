import React from 'react';
import { useLocation } from 'react-router-dom';
import female from "../../asstes/images/female.jpg";
import male from "../../asstes/images/male.png";
import Loading from '../../components/shared/Loading';
import useGetStudentById from '../../hooks/useGetUserById';
import AcademicDetails from './AcademicDetails';
import EmploymentDetails from './EmploymentDetails';
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
            <div className="flex justify-center gap-2 my-4">
                <div className='flex items-center gap-2'>
                    <img
                        src={student?.photo ? student?.photo : student?.gender === 'male' ? male : female}
                        alt={student?.name}
                        width='150px'
                    />
                    <div>
                        <h3>Name: {student?.name}</h3>
                        <p>Email: {(studentId === student?.id || student?.shareContact === 'yes') ? student?.email : <span className='text-red-500'>Not Have Permission To See</span>}</p>
                        <p>Mobile: {(student?.shareContact === 'yes' || studentId === student?.id) ? student?.mobile : <span className='text-red-500'>Not Have Permission To See</span>}</p>                        
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                {
                    student?.personal_info && <PersonalDetails details={student?.personal_info} /> 
                }
                {
                    student?.course && <AcademicDetails details={student} />
                }
                {
                    student?.employment_info.length > 0 && <EmploymentDetails details={student?.employment_info} />
                }
            </div>
        </div>
    );
};

export default SingleStudent;