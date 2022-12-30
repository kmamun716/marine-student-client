import axios from 'axios';
import React, { useState } from 'react';
import './Home.css';
import SearchedStudent from './SearchedStudent';

const Home = () => {
    const [query, setQuery] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [searchedStudents, setSearchStudent] = useState([]);
    const [error, setError] = useState(null);
    const handleReSearch = () => {
        setQuery('')
        setSearchStudent([])
        setError(null)
        setShowForm(true)
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowForm(false)
        try {
            const res = await axios.get(`http://localhost:4000/api/v1/student/single/${query}`)
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
    return (
        <div className='home-container flex justify-center'>
            <section className='slider'>
                <div className="form-control search-group">
                    {
                        showForm && <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <input type="text"
                                    onChange={e => setQuery(e.target.value)}
                                    placeholder="Search Student By Name"
                                    className="input input-bordered"
                                    required
                                />
                                <button className="btn btn-square">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </button>
                            </div>
                        </form>
                    }
                    <div className='my-2'>
                        <div className='flex justify-center gap-2 my-2'>
                            {
                                error ? <p className='text-red-500 text-2xl font-bold'>{error}</p> : searchedStudents?.length > 0 ? <p className='text-green-500'>{searchedStudents?.length} Student Found </p> : ''
                            }
                            {
                                error ? <span className='btn btn-sm btn-secondary' onClick={handleReSearch}>Re-search</span> : searchedStudents?.length>0 && <span className='btn btn-sm btn-secondary' onClick={handleReSearch}>Re-search</span>
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

export default Home;