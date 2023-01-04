import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Loading from '../../components/shared/Loading';
import useGetSingleUser from '../../hooks/useGetSingleUser';

const Dashboard = () => {
    const token = localStorage.getItem('authToken');
    const [student, isLoading] = useGetSingleUser(token);
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">
                    <h2>Welcome <span className='text-primary'>{student?.name}</span> To Dashboard</h2>
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                        <li><Link to='/dashboard'>Profile</Link></li>
                        {
                            student?.status === 'active' && <li><Link to='/dashboard/search/student'>Search Student</Link></li>
                        }
                        {
                            student?.role === "admin" && <>
                                <li><Link to='/dashboard/all-student'>Student List</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;