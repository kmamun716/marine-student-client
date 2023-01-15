import React from 'react';

const EmploymentDetails = ({details}) => {
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
            </div>
        </div>
    );
};

export default EmploymentDetails;