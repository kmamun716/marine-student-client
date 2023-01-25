import React from 'react';
import { Link } from 'react-router-dom';

const EmploymentDetails = ({ details }) => {
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Employment Information:</h2>
                <div className="overflow-x-auto">
                    <table className="table table-compact w-64">
                        <thead>
                            <tr>
                                <th>Sl</th>
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
                                details?.map((em, index) => <tr className={`${index % 2 !== 0 && 'active'}`} key={index}>
                                    <td data-label="Sl">{index + 1}</td>
                                    <td data-label="Company" className='link link-hover text-info'><Link to={`/employee/${em?.companyName.replace(/\s+/g, "-")}`}>{em?.companyName}</Link></td>
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