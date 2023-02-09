import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { host } from '../../components/shared/host';

const ResetPassword = () => {
    const { id } = useParams();
    const [input, setInput] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showMessage, setShowMessage] = useState(false);
    const handleChange = e =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit=async e=>{
        e.preventDefault();
        try{
            const result = await axios.put(`${host}/api/v1/auth/resetPassword/${id}`,{password: input.password});
            e.target.reset();
            toast.success(result?.data?.message);
            setShowMessage(true);
        }catch(err){
            toast.error('There Have Some Server Side Error!')
        }
    };
    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-xl underline'>Reset Password:</h2>
            {
                !showMessage ? <form onSubmit={handleSubmit}>
                <div className="form-control w-64 max-w-xs">
                    <label className="label">
                        <span className="label-text">Password:</span>
                    </label>
                    <input
                        type="password"
                        className="input input-bordered w-full max-w-xs"
                        onChange={handleChange}
                        placeholder='Enter Password'
                        name='password'
                        required
                    />
                </div>
                <div className="form-control w-64 max-w-xs">
                    <label className="label">
                        <span className="label-text">Re-type Password:</span>
                    </label>
                    <input
                        type="password"
                        className="input input-bordered w-full max-w-xs"
                        onChange={handleChange}
                        placeholder='Enter Password Again'
                        name='confirmPassword'
                        required
                    />
                </div>
                {input.password !== input.confirmPassword? <p className='text-red-500'>Password Not Matched!</p>: ''}
                <input
                    className='btn btn-warning my-2'
                    type="submit" 
                    value='Reset'
                    disabled = {input.password !== input.confirmPassword}
                />
            </form>: <p className='text-xl text-green-600'>Now Go To Login Page to Sign In</p>
            }
        </div>
    );
};

export default ResetPassword;