import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/shared/Loading';
import Paginate from '../../components/shared/Paginate';
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
        const res = await fetch('http://localhost:4000/api/v1/student/all');
        return await res.json();
    })
    const changeQuery = async (filter, id) => {
        const token = localStorage.getItem('authToken')
        const result = await axios.put(`http://localhost:4000/api/v1/auth/${id}`, filter, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        refetch()
        toast.success(result?.data?.message)
    };
    const indexOfLastRecord = currentPage * 20;
    const indexOfFirstRecord = indexOfLastRecord - 20;
    const currentRecords = record?.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(record?.length / 20);
    const admin = data?.filter(student => student?.role === "admin");
    const pending = data?.filter(student => student?.status === "pending");

    useEffect(() => {
        if (select === "all") {
            setRecord(data)
        }
        if (select === "pending") {
            setRecord(pending)
        }
        if (select === "admin") {
            setRecord(admin)
        }
    }, [select, data, admin, pending])

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
                            <th>Role</th>
                            <th>Status</th>
                            <th>Change Role</th>
                            <th>Change status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords?.map((student, index) => <tr className={index % 2 !== 0 ? 'active' : ''} key={student?.id}>
                            <th>{index + 1}</th>
                            <td className='link link-hover text-info'><Link to={`/student/${student?.name.replace(/\s+/g, "-")}`} state={student?.id}>{student?.name}</Link></td>
                            <td>{student?.email}</td>
                            <td>{student?.role}</td>
                            <td>{student?.status}</td>
                            <td>
                                {
                                    student?.role === "user" ? <label
                                    htmlFor="role-change-modal"
                                    className="btn btn-info btn-xs"
                                    onClick={() => setRoleModal({role: 'admin', id: student?.id})}
                                  >
                                    Make Admin
                                  </label> : student?.id !== currentStudent?.id && <label
                                    htmlFor="role-change-modal"
                                    className="btn btn-accent btn-xs"
                                    onClick={() => setRoleModal({role: 'user', id: student?.id})}
                                  >
                                    Make User
                                  </label>
                                }
                            </td>
                            <td>
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