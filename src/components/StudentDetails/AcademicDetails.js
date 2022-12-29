import React, { useState } from 'react';
import EditAcademicDetailsModal from '../EditModal/EditAcademicDetailsModal';

const AcademicDetails = ({ details }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Academic Information:</h2>
                <p>Course : {details?.course}</p>
                <p>Intake : {details?.intake}</p>
                <p>Status : {details?.status}</p>
                {details?.status === "passed" && <p>Passing Year : {details?.passingYear}</p>}
                <label htmlFor="edit-academic-details-modal"  className='btn btn-info' onClick={()=>setModalOpen(true)}>Edit</label>
                {
                    modalOpen && <EditAcademicDetailsModal setModalOpen={setModalOpen} data={details} />
                }
            </div>
        </div>
    );
};

export default AcademicDetails;