import axios from 'axios';
import React, { useState } from 'react';
import { host } from '../../components/shared/host';
import SearchedStudent from './SearchedStudent';
import './searchStudent.css';

const SearchStudent = () => {
    const [query, setQuery] = useState({
        name: '',
        course: 'DEMT',
        intake: null
    });
    const [showForm, setShowForm] = useState(true);
    const [searchedStudents, setSearchStudent] = useState([]);
    const [error, setError] = useState(null);
    const handleReSearch = () => {
        setQuery({
            name: '',
            course: 'DEMT',
            intake: null
        })
        setSearchStudent([])
        setError(null)
        setShowForm(true)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(query)
        setShowForm(false)
        try {
            const res = await axios.post(`${host}/api/v1/student/search`, query)
            if (res?.status === 200) {
                setSearchStudent(res.data);
                setError(null)
            }
        } catch (err) {
            if (err?.response?.status === 400) {
                setSearchStudent([])
                setError(err?.response?.data?.message)
            }
        }
    };
    const handleChange = (e) => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className='home-container flex justify-center'>
            <section className='slider bg-gray-200'>
                <div className="form-control search-group">
                    {
                        showForm && <>
                            <p className='font-bold'>Search By Name:</p>
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <input type="text"
                                        onChange={handleChange}
                                        placeholder="Search Student By Name"
                                        className="input input-bordered"
                                        name='name'
                                        required
                                    />
                                    <button className="btn btn-square">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    </button>
                                </div>
                            </form>
                            <p className='font-bold'>Search By Course:</p>
                            <form className='flex flex-col' onSubmit={handleSubmit}>
                                <select
                                    className="select select-bordered w-64 max-w-xs"
                                    name='course'
                                    onChange={handleChange}
                                    value={query.course || ''}
                                >
                                    <option value='select' disabled>Select One</option>
                                    <option value="DEMT">DEMT</option>
                                    <option value="DEST">DEST</option>
                                    <option value="MDEA">MDEA</option>
                                    <option value="SBW">SBW</option>
                                    <option value="SBD">SBW</option>
                                    <option value="SF">SF</option>
                                </select>
                                <input type="number"
                                    onChange={handleChange}
                                    placeholder="Intake No"
                                    className="input input-bordered w-64 my-2"
                                    required
                                    name='intake'
                                />
                                <input className='btn btn-sm btn-primary' type="submit" value='Search' />
                            </form>
                        </>
                    }
                    <div className='my-2'>
                        <div className='flex justify-center gap-2 my-2'>
                            {
                                error ? <p className='text-red-500 text-2xl font-bold'>{error}</p> : searchedStudents?.length > 0 ? <p className='text-green-500'>{searchedStudents?.length} Student Found </p> : ''
                            }
                            {
                                error ? <span className='btn btn-sm btn-secondary' onClick={handleReSearch}>Re-search</span> : searchedStudents?.length > 0 && <span className='btn btn-sm btn-secondary' onClick={handleReSearch}>Re-search</span>
                            }
                        </div>
                        {
                            searchedStudents?.length > 0 && <SearchedStudent students={searchedStudents} />
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SearchStudent;