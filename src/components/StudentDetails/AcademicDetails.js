import React from 'react';

const AcademicDetails = ({details}) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Academic Information:</h2>
                <p>Course : {details?.course}</p>
                <p>Intake : {details?.intake}</p>
                <p>Status : {details?.status}</p>
                {details?.status === "passed" && <p>Passing Year : {details?.passingYear}</p>}
                <button className='btn btn-info'>Edit</button>
            </div>
        </div>
    );
};

export default AcademicDetails;