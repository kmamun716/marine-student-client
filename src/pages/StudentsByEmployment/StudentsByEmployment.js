import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const StudentsByEmployment = () => {
    const [employees, setEmployees] = useState([]);
    const { slug } = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/api/v1/student/employment/${slug.split('-').join(' ')}`)
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(err => console.log(err))
    }, [slug])
    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className='text-center text-xl underline'>Student List From {slug.split('-').join(' ')}</h2>
                <div className="overflow-x-auto">
                    {
                        employees?.length > 0 ? <table className="table w-full my-2">
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Designation</th>
                                    <th>Service Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees?.map((employee, index) => <tr className={index % 2 !== 0 ? 'active' : ''} key={index}>
                                    <td data-label="Sl"><span className={`${index % 2 !== 0 && 'text-black'}`}>{index + 1}</span></td>
                                    <td data-label="Name" className='link link-hover text-info'><Link to={`/student/${employee?.student?.name?.replace(/\s+/g, "-")}`} state={employee?.student?.id}>{employee?.student?.name}</Link></td>
                                    <td data-label="Department">{employee?.department}</td>
                                    <td data-label="Designation">{employee?.designation}</td>
                                    <td data-label="Service Duration">{employee?.joiningYear} To {employee?.jobEnd ? employee?.jobEnd : 'Continue'}</td>


                                </tr>)}
                            </tbody>
                        </table> : <p className='text-xl text-center text-red-500 font-extrabold'>Student Not Found From {slug.split('-').join(' ')}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default StudentsByEmployment;