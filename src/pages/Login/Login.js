import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ForgotPassword from '../../components/EditModal/ForgotPassword';
import LoginComp from './LoginComp';

const Login = () => {
    const [modalOpen, setModalOpen] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();
    const token = localStorage.getItem('authToken');
    let from = location.state?.from?.pathname || "/";
    
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [from, navigate, token]);
    return (
        <div>
            <h2 className='text-xl text-center underline'>Login Here</h2>
            <div className='flex flex-col items-center'>
                <LoginComp/>
                <div>
                    <label className='cursor-pointer text-left' htmlFor='forgot-password-modal' onClick={() => setModalOpen(true)}>Forgot Password?</label>
                    <p>Not Have Any Account? <Link className="link link-neutral" to='/register'>Register Here</Link></p>
                </div>
            </div>
            {
                modalOpen && <ForgotPassword setModalOpen={setModalOpen} />
            }
        </div>
    );
};

export default Login;