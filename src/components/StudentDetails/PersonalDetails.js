import React, { useState } from 'react';
import EditPersonalDetailsModal from '../EditModal/EditPersonalDetailsModal';

const PersonalDetails = ({ details, refetch }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Personal Information:</h2>
                <div>
                <div className='flex flex-col lg:flex-row lg:gap-4 mb-2'>
                    <div>
                        <p>Father : {details?.father}</p>
                        <p>Mother : {details?.mother}</p>
                        <p>Blood Group : {details?.bloodGroup}</p>
                        <p>Date of Birth : {details?.mother}</p>
                        <p>Present Address :{details?.presentDistrict}, {details?.presentCountry}</p>
                        <p>Permanent Address : {details?.permanentDistrict}, {details?.permanentCountry}</p>
                    </div>
                    <div>
                        <p>National ID No : {details?.nId}</p>
                        <p>Religion : {details?.religion}</p>
                        <p>Whatsapp : {details?.whatsApp}</p>
                        <p>Facebook : {details?.facebook}</p>
                        <p>Linkedin : {details?.linkedIn}</p>
                        <p>Status : {details?.employmentStatus}</p>
                    </div>
                </div>
                <label htmlFor="edit-personal-details-modal" className='btn btn-info' onClick={() => setModalOpen(true)}>Edit</label>
                </div>
            </div>
            {
                modalOpen && <EditPersonalDetailsModal refetch={refetch} setModalOpen={setModalOpen} data={details} />
            }
        </div>
    );
};

export default PersonalDetails;