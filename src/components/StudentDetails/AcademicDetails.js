import React from 'react';

const AcademicDetails = ({ details }) => {
    const handleEdit = ()=>{

    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Academic Information:</h2>
                <p>Course : {details?.course}</p>
                <p>Intake : {details?.intake}</p>
                <p>Status : {details?.status}</p>
                {details?.status === "passed" && <p>Passing Year : {details?.passingYear}</p>}
                <label htmlFor="edit-details-modal"  className='btn btn-info' onClick={handleEdit}>Edit</label>
            </div>
        </div>
    );
};

export default AcademicDetails;