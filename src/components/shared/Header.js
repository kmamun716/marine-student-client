import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('authToken');
    const navMenu = <>
        <li>{token ? <p onClick={() => {
            localStorage.removeItem('authToken')
            navigate('/login')
        }}>Log Out</p> : location.pathname !== '/login' ? <Link to='/login'>Login</Link> : ''}</li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
    </>;
    return (
        <header>
            <nav>
                <div className="navbar bg-zinc-300">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                {navMenu}
                            </ul>
                        </div>
                        <Link to='/' className="btn btn-ghost normal-case text-xl">BIMTIAN</Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navMenu}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        {location.pathname.split('/').includes('dashboard') && <label htmlFor="dashboard-drawer" tabIndex={1} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;