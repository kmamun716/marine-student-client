import React, { useState } from 'react';
import EditAcademicDetailsModal from '../EditModal/EditAcademicDetailsModal';

const AcademicDetails = ({ details, refetch }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Academic Information:</h2>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-64">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Intake</th>
                                <th>Status</th>
                                <th>Passing Year</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Course">{details?.course}</td>
                                <td data-label="Intake">{details?.intake}</td>
                                <td data-label="Status">{details?.academicStatus}</td>
                                <td data-label="Passing Year">{details?.academicStatus === "passed" ? details?.passingYear : 'Running Student'}</td>
                                <td data-label="Action"><label htmlFor="edit-academic-details-modal"  className='btn btn-xs btn-info' onClick={()=>setModalOpen(true)}>Edit</label></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                {
                    modalOpen && <EditAcademicDetailsModal refetch={refetch} setModalOpen={setModalOpen} data={details} />
                }
            </div>
        </div>
    );
};

export default AcademicDetails;