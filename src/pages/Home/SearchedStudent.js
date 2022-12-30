import React from 'react';
import { Link } from 'react-router-dom';

const SearchedStudent = ({ students }) => {
    console.log(students)
    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>Name</th>
                            <th>Course</th>
                            <th>Intake</th>
                            <th>Educational <br/> Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students?.map(student => <tr key={student?.id}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={student?.personal_info.photo} alt={student?.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{student?.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {student?.academic_info?.course}
                                </td>
                                <td>{student?.academic_info.intake}</td>
                                <td>{student?.academic_info.status}</td>
                                <th><Link className='btn btn-xs' to={`/student/${student?.name.replace(/\s+/g, "-")}`} state={student?.id}>More Info</Link></th>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default SearchedStudent;