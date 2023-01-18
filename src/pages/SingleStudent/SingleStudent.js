import React from 'react';
import { useLocation } from 'react-router-dom';
import female from "../../asstes/images/female.jpg";
import male from "../../asstes/images/male.png";
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
    const handleSentRequest=(id)=>{
        const token = localStorage.getItem('authToken')
    }
    if (isLoading) {
        return <Loading />
    }
    console.log(student)
    return (
        <div>
            <div className="flex justify-center gap-2 mb-4">
                <div className='flex items-center'>
                    <img
                        src={student?.personal_info?.photo ? student?.personal_info?.photo : student?.gender === 'male' ? male : female}
                        alt={student?.name}
                        width='150px'
                    />
                    <div>
                        <h3>Name: {student?.name}</h3>
                        <p>Email: {student?.email}</p>
                        <p>Mobile: {student?.mobile}</p>
                        <button onClick={()=>handleSentRequest(studentId)} className='btn btn-secondary btn-sm'>Sent Request</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
                {
                    student?.employment_info.length > 0 ? <EmploymentDetails details={student?.employment_info} /> : <p className='text-xl text-red-500'>Employment Details Not Added</p>
                }
                <div className={`flex flex-col lg:flex-row gap-4`}>
                    <div>
                        {
                            student?.personal_info ? <PersonalDetails details={student?.personal_info} /> : <p className='text-xl text-red-500'>Personal Details Not Added</p>
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        {
                            student?.course ? <AcademicDetails details={student} /> : <p className='text-xl text-red-500'>Academic Details Not Added</p>
                        }
                        {
                            student?.others_info ? <OthersDetails details={student?.others_info} /> : <p className='text-xl text-red-500'>Emmmergency Contact Details Not Added</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleStudent;