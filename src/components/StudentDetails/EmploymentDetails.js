import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditEmploymentDetailsModal from '../EditModal/EditEmploymentDetailsModal';

const EmploymentDetails = ({ details, refetch }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="card w-96 lg:w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Employment Information:</h2>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-96">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Company</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Joining Date</th>
                                <th>Joining Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                details.map((em, index)=><tr key={index}>
                                    <th>{index+1}</th>
                                    <td>{em?.companyName}</td>
                                    <td>{em?.department}</td>
                                    <td>{em?.designation}</td>
                                    <td>{em?.city}</td>
                                    <td>{em?.country}</td>
                                    <td>{em?.joiningYear}</td>
                                    <td>{em?.joiningYear}</td>
                                    <td><label htmlFor="edit-employment-details-modal" className='btn btn-info btn-sm' onClick={() => setModalOpen(true)}>Edit</label></td>
                                </tr>)
                            }
                        </tbody>                        
                    </table>
                </div>
                <Link className="link link-hover text-primary" to="/student/details/add/employment"> Add More Employment Details </Link>
            </div>
            {
                modalOpen && <EditEmploymentDetailsModal refetch={refetch} setModalOpen={setModalOpen} data={details} />
            }
        </div>
    );
};

export default EmploymentDetails;