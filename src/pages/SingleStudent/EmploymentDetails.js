import React from 'react';

const EmploymentDetails = ({ details }) => {
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Employment Information:</h2>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-64">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Company</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Service Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                details?.map((em, index) => <tr className={`${index % 2 === 0 && 'active'}`} key={index}>
                                    <th data-label="S.No">{index + 1}</th>
                                    <td data-label="Company">{em?.companyName}</td>
                                    <td data-label="Department">{em?.department}</td>
                                    <td data-label="Designation">{em?.designation}</td>
                                    <td data-label="City">{em?.city}</td>
                                    <td data-label="Country">{em?.country}</td>
                                    <td data-label="Service Duration">{em?.joiningYear} To {em?.jobEnd ? em?.jobEnd : 'Continue'}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmploymentDetails;