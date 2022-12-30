import React from 'react';

const OthersDetails = ({ details }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Emmergency Contact:</h2>
                <p>Name : {details?.name}</p>
                <p>Relation : {details?.relation}</p>
                <p>Mobile No : {details?.mobile}</p>
                <p>Email : {details?.email}</p>
                <p>Facebook ID : {details?.facebook ? details?.facebook : 'Not Given'}</p>
                <p>Whatsapp : {details?.whatsApp ? details?.whatsApp : 'Not Given'}</p>
            </div>
        </div>
    );
};

export default OthersDetails;