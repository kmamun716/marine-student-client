import React from 'react';

const PersonalDetails = ({ details }) => {
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className=" card-body">
                <h2 className="card-title">Personal Information:</h2>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-64">
                        <thead>
                            <tr>
                                <th>Blood Group</th>
                                <th>Present Address</th>
                                <th>Facebook ID</th>
                                <th>Linkedin ID</th>
                                <th>Employment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Blood Group">{details?.bloodGroup}</td>
                                <td data-label="Present Address">{details?.presentDistrict}, {details?.presentCountry}</td>
                                <td data-label="Facebook ID">{details?.facebook}</td>
                                <td data-label="Linkedin ID">{details?.linkedIn}</td>
                                <td data-label="Current Employment Status">{details?.employmentStatus}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetails;