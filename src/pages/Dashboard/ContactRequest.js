import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import Loading from '../../components/shared/Loading';

const ContactRequest = () => {
    const token = localStorage.getItem('authToken');
    const { data: requests, isLoading, refetch } = useQuery(['requests'], async () => {
        const res = await fetch(`http://localhost:4000/api/v1/external/contactRequest/`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        return await res.json();
    });

    const handleRequest= (id, data)=>{
        fetch(`http://localhost:4000/api/v1/external/contactRequest/edit/${id}`,{
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=> res.json())
        .then(data=>{
            toast.success(data?.message);
            refetch()
        })
    }

    if (isLoading) {
        return <Loading />
    };
    return (
        <div>
            <h4 className='text-xl underline text-center'>Your Contact Requester List</h4>
            <div className='my-2'>
                {
                    requests?.length > 0 ? <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Sl</th>
                                <th>Request By</th>
                                <th>Course</th>
                                <th>Intake</th>
                                <th>Permission</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                requests?.map((request, index)=><tr className={index % 2 !== 0 ? 'active' : ''} key={request?.id}>
                                    <td data-label="Sl"><span className={`${index % 2 !== 0 && 'text-black'}`}>{index + 1}</span></td>
                                    <td data-label="Request By">{request?.student.name}</td>
                                    <td data-label="Course">{request?.student.course}</td>
                                    <td data-label="Intake">{request?.student.intake}</td>
                                    <td data-label="Permission" className={`font-bold ${request?.permission === 'yes'? 'text-green-500' : 'text-red-500'}`}>{request?.permission}</td>
                                    <td data-label="Action">{
                                        request?.permission === 'yes' ? <button onClick={()=>handleRequest(request?.id, {permission: 'no'})} className='btn btn-xs btn-secondary'>Decline</button> : <button onClick={()=>handleRequest(request?.id, {permission: 'yes'})} className='btn btn-xs btn-info'>Accept</button>
                                    }</td>
                                </tr>)
                            }
                        </tbody>
                    </table> : <h2 className='text-xl text-red-500 my-10 font-bold'>No Request Found</h2>
                }
            </div>
        </div>
    );
};

export default ContactRequest;