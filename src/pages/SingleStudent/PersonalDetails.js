import React from 'react';

const PersonalDetails = ({details}) => {
    return (
        <div className="card w-96 bg-red-200 shadow-xl">
            <div className=" card-body">
                <h2 className="card-title">Personal Information:</h2>
                <p>Blood Group : {details?.bloodGroup}</p>
                <p>Present Address : {details?.presentAddress}</p>
                <p>Permanent Address : {details?.permanentAddress}</p>
                <p>Facebook : {details?.facebook}</p>
                <p>Linkedin : {details?.linkedIn}</p>
            </div>
        </div>
    );
};

export default PersonalDetails;