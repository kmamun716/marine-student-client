import React, { useState } from 'react';
import EditEmploymentDetailsModal from '../EditModal/EditEmploymentDetailsModal';

const EmploymentDetails = ({ details }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Employment Information:</h2>
                <p>Company : {details?.companyName}</p>
                <p>Group : {details?.groupName}</p>
                <p>Department : {details?.department}</p>
                <p>Designation : {details?.designation}</p>
                <p>City : {details?.city}</p>
                <p>Country : {details?.country}</p>
                <p>Joining Date : {details?.joiningYear}</p>
                <label htmlFor="edit-employment-details-modal"  className='btn btn-info' onClick={()=>setModalOpen(true)}>Edit</label>
            </div>
            {
                modalOpen && <EditEmploymentDetailsModal setModalOpen={setModalOpen} data={details} />
            }
        </div>
    );
};

export default EmploymentDetails;