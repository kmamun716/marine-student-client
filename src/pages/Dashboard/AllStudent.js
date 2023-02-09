import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { host } from '../../components/shared/host';
import Loading from '../../components/shared/Loading';
import Paginate from '../../components/shared/Paginate';
import setAuthHeader from '../../components/shared/setAuthHeader';
import useGetSingleUser from '../../hooks/useGetSingleUser';
import RoleChangeConfirmation from './RoleChangeConfirmation';

const AllStudent = () => {
    const token = localStorage.getItem('authToken');
    const [select, setSelct] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [record, setRecord] = useState([]);
    const [currentStudent, isStudentLoading] = useGetSingleUser(token);
    const [roleModal, setRoleModal] = useState({
        role: null,
        id: null
    });
    const { data, isLoading, refetch } = useQuery(['students'], async () => {
        const res = await fetch(`${host}/api/v1/student/all`);
        return await res.json();
    })
    const changeQuery = async (filter, id) => {
        const token = localStorage.getItem('authToken');
        setAuthHeader(token)
        const result = await axios.put(`${host}/api/v1/auth/${id}`, filter);
        refetch()
        toast.success(result?.data?.message)
    };
    const indexOfLastRecord = currentPage * 20;
    const indexOfFirstRecord = indexOfLastRecord - 20;
    const currentRecords = record?.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(record?.length / 20);
    const moderator = data?.filter(student => student?.role === "moderator");
    const pending = data?.filter(student => student?.status === "pending");

    useEffect(() => {
        if (select === "all") {
            setRecord(data)
        }
        if (select === "pending") {
            setRecord(pending)
        }
        if (select === "moderator") {
            setRecord(moderator)
        }
    }, [select, data, moderator, pending])

    if (isLoading || isStudentLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className='flex justify-around items-center'>
                <h2 className='underline text-xl'>Student List</h2>
                <div className='flex items-center'>
                    <p className='mr-2'>Filter By: </p>
                    <select onChange={(e) => { setSelct(e.target.value) }} className="select select-bordered w-26 max-w-xs">
                        <option value='all'>All</option>
                        <option value='admin'>Admin</option>
                        <option value='pending'>Pending</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto my-2">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Intake</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Change Role</th>
                            <th>Change status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords?.map((student, index) => <tr key={student?.id}>
                            <td data-label="Sl"><span className={`${index % 2 !== 0 && 'text-black'}`}>{index + 1}</span></td>
                            <td data-label="Name" className='link link-hover text-info'><Link to={`/student/${student?.name.replace(/\s+/g, "-")}`} state={student?.id}>{student?.name}</Link></td>
                            <td data-label="Course">{student?.email}</td>
                            <td data-label="Course">{student?.course}</td>
                            <td data-label="Intake">{student?.intake}</td>
                            <td data-label="Role">{student?.role}</td>
                            <td data-label="Status">{student?.status}</td>
                            <td data-label="Change Role">
                                {
                                    student?.role === "user" ? <label
                                        htmlFor="role-change-modal"
                                        className="btn btn-info btn-xs"
                                        onClick={() => setRoleModal({ role: 'moderator', id: student?.id })}
                                    >
                                        Make Moderator
                                    </label> : (student?.id === currentStudent?.id || student?.role === 'admin') ? " ": <label
                                        htmlFor="role-change-modal"
                                        className="btn btn-accent btn-xs"
                                        onClick={() => setRoleModal({ role: 'user', id: student?.id })}
                                    >
                                        Make User
                                    </label>
                                }
                            </td>
                            <td data-label="Change Status">
                                {
                                    student?.status === "pending" ? <button onClick={() => changeQuery({ status: 'active' }, student?.id)} className="btn btn-primary btn-xs">Make Active</button> : <button onClick={() => changeQuery({ status: 'pending' }, student?.id)} className="btn btn-warning btn-xs">Make Pending</button>
                                }
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                <div className="flex justify-center">
                    {
                        nPages > 1 && <Paginate
                            nPages={nPages + 1}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    }
                </div>
            </div>
            {roleModal.role && <RoleChangeConfirmation details={roleModal} changeQuery={changeQuery} />}
        </div>
    );
};

export default AllStudent;