import axios from 'axios';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import female from "../../asstes/images/female.jpg";
import male from "../../asstes/images/male.png";
import Loading from '../../components/shared/Loading';
import useGetSingleUser from '../../hooks/useGetSingleUser';
import useGetStudentById from '../../hooks/useGetUserById';
import AcademicDetails from './AcademicDetails';
import EmploymentDetails from './EmploymentDetails';
import PersonalDetails from './PersonalDetails';

const SingleStudent = () => {
    const token = localStorage.getItem('authToken')
    const location = useLocation();
    const studentId = location.state;
    const [student, isLoading, refetch] = useGetStudentById(studentId);
    const [studentData, studentIsLoading] = useGetSingleUser(token);
    const handleSentRequest = async (id) => {
        if (id !== studentData?.id) {
            const request = await axios.post(`http://localhost:4000/api/v1/external/contactRequest/${id}`, null, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            if (request?.status === 200) {
                toast.success(request?.data?.message)
                refetch()
            }
        }
    }
    if (isLoading || studentIsLoading) {
        return <Loading />
    }
    const requested = student?.contact_request?.find(cr => cr?.requestBy === studentData?.id);
    return (
        <div>
            <div className="flex justify-center gap-2 mb-4">
                <div className='flex items-center gap-2'>
                    <img
                        src={student?.personal_info?.photo ? student?.personal_info?.photo : student?.gender === 'male' ? male : female}
                        alt={student?.name}
                        width='150px'
                    />
                    <div>
                        <h3>Name: {student?.name}</h3>
                        <p>Email: {(studentId === studentData?.id || requested?.permission === 'yes') ? student?.email : <span className='text-red-500'>Not Have Permission To See</span>}</p>
                        <p>Mobile: {(requested?.permission === 'yes' || studentId === studentData?.id) ? student?.mobile : <span className='text-red-500'>Not Have Permission To See</span>}</p>
                        {
                            !requested ? <button onClick={() => handleSentRequest(studentId)} className='btn btn-secondary btn-sm'>Sent Request For Contact Details</button> : requested?.permission !== 'yes' && <p className='text-green-500'>Request Sent, Please Wait For Confirmation <span className='text-red-500'>or</span> Contact With Admin</p>
                        }
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