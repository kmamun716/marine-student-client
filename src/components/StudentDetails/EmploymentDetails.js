import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditEmploymentDetailsModal from '../EditModal/EditEmploymentDetailsModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const EmploymentDetails = ({ details, refetch }) => {
    const token = localStorage.getItem('authToken');
    const [employmentModal, setModalOpen] = useState({});
    const [deleteConfirmModal, setDeleteConfirm]= useState('');
    const handleDelete = async id => {
        try {
            const result = await axios.delete(`http://localhost:4000/api/v1/external/employment/delete/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            toast.success(result?.data?.message);
            refetch();
        } catch (err) {
            toast.error(err?.response?.data?.message)
        }
    }
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Employment Information:</h2>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-64">
                        <thead>
                            <tr>
                                <th>Sl</th>
                                <th>Company</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Service Duration</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                details?.map((em, index) => <tr className={`${index % 2 !== 0 && 'active'}`} key={index}>
                                    <td data-label="Sl"><span className={`${index % 2 !== 0 && 'text-black'}`}>{index + 1}</span></td>
                                    <td data-label="Company">{em?.companyName}</td>
                                    <td data-label="Department">{em?.department}</td>
                                    <td data-label="Designation">{em?.designation}</td>
                                    <td data-label="City">{em?.city}</td>
                                    <td data-label="Country">{em?.country}</td>
                                    <td data-label="Service Duration">{em?.joiningYear} To {em?.jobEnd ? em?.jobEnd : 'Continue'}</td>
                                    <td data-label="Action"><label htmlFor="edit-employment-details-modal" className='btn btn-info btn-xs' onClick={() => setModalOpen(em)}>Edit</label> <label htmlFor="delete-confirmation-modal" onClick={() => setDeleteConfirm(em?.id)} className='btn bg-red-500 btn-xs'>Delete</label></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                <Link className="link link-hover text-primary" to="/student/details/add/employment"> Add {details?.length > 0 ? 'More' : ''} Employment Details </Link>
            </div>
            {
                employmentModal && <EditEmploymentDetailsModal refetch={refetch} setModalOpen={setModalOpen} data={employmentModal} />
            }
            {
                deleteConfirmModal && <DeleteConfirmationModal id={deleteConfirmModal} handleDelete={handleDelete} />
            }
        </div>
    );
};

export default EmploymentDetails;