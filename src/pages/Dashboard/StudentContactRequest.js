import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/shared/Loading';

const StudentContactRequest = () => {
    const token = localStorage.getItem('authToken');
    const { data: requests, isLoading, refetch } = useQuery(['requests'], async () => {
        const res = await fetch(`http://localhost:4000/api/v1/external/contactRequest/all`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        return await res.json();
    });
    const handleRequest = (id, data) => {
        fetch(`http://localhost:4000/api/v1/external/contactRequest/edit/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                toast.success(data?.message);
                refetch()
            })
    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <h4 className='text-xl underline text-center mb-2'>All Contact Request Details</h4>
            {
                requests?.length > 0 ? <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Request By</th>
                            <th>Request To</th>
                            <th>Permission</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests?.map((request, index) => <tr className={index % 2 !== 0 ? 'active' : ''} key={request?.id}>
                                <td data-label="Sl">{index + 1}</td>
                                <td data-label="Request By" className='link link-hover text-info'><Link to={`/student/${request?.student?.name.replace(/\s+/g, "-")}`} state={request?.student?.id}>{request?.student?.name}</Link></td>
                                <td data-label="Request To" className='link link-hover text-info'><Link to={`/student/${request?.requested_user?.name.replace(/\s+/g, "-")}`} state={request?.requested_user?.id}>{request?.requested_user?.name}</Link></td>
                                <td data-label="Permission" className={`font-bold ${request?.permission === 'yes' ? 'text-green-500' : 'text-red-500'}`}>{request?.permission}</td>
                                <td data-label="Action">{
                                    request?.permission === 'yes' ? <button onClick={() => handleRequest(request?.id, { permission: 'no' })} className='btn btn-xs btn-secondary'>Decline</button> : <button onClick={() => handleRequest(request?.id, { permission: 'yes' })} className='btn btn-xs btn-info'>Accept</button>
                                }</td>
                            </tr>)
                        }
                    </tbody>
                </table> : <p className="text-xl text-red-500 font-bold">No Request Found</p>
            }
        </div>
    );
};

export default StudentContactRequest;