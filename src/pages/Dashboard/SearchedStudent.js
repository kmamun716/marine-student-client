import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Female from '../../asstes/images/female.jpg';
import Male from '../../asstes/images/male.png';
import Paginate from '../../components/shared/Paginate';

const SearchedStudent = ({ students }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRecord = currentPage * 5;
    const indexOfFirstRecord = indexOfLastRecord - 5;
    const currentRecords = students?.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(students?.length / 5);
    return (
        <div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>SL</th>
                            <th className='text-center'>Name</th>
                            <th>Course</th>
                            <th>Intake</th>
                            <th><p className='break-words'>Educational Status</p></th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentRecords?.map((student, index) => <tr className={`${index %2 ===0 && 'active'}`} key={student?.id}>
                                <td>
                                    {index+1}
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img
                                                    src={student?.personal_info?.photo?student?.personal_info?.photo : student?.gender ==='male'? Male : Female}
                                                    alt={student?.name}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{student?.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {student?.course}
                                </td>
                                <td>{student?.intake}</td>
                                <td>{student?.academicStatus}</td>
                                <th><Link className='btn btn-xs' to={`/student/${student?.name.replace(/\s+/g, "-")}?${student?.id}`} state={student?.id}>More Info</Link></th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                    {
                        nPages > 1 && <Paginate
                            nPages={nPages + 1}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    }
                </div>
        </div>
    );
};

export default SearchedStudent;