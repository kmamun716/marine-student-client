import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../../components/shared/FormInput';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();
    let location = useLocation();
    const token = localStorage.getItem('authToken');
    let from = location.state?.from?.pathname || "/";
    const onSubmit = async data => {
        try {
            const student = await axios.post('http://localhost:4000/api/v1/auth/login', data);
            if (student?.status === 200) {
                toast.success(student?.data?.message)
                localStorage.setItem('authToken', student?.data?.token)
            }
            if (student?.status === 204) {
                toast.error('Password Not Matched')
            }
        } catch (err) {
            if (err?.response?.data?.message) {
                toast.error(err?.response?.data?.message)
            }
        }
    };
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [from, navigate, token])
    return (
        <div>
            <h2 className='text-xl text-center underline'>Login Here</h2>
            <div className='flex flex-col items-center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email:</span>
                        </label>
                        <FormInput
                            type='text'
                            name='email'
                            placeholder='Type Your Valid Email'
                            register={register}
                        />
                        {errors?.email && <p className='text-red-500'>Please Input Valid Email</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password:</span>
                        </label>
                        <FormInput
                            type='password'
                            name='password'
                            placeholder='Enter Your Password'
                            register={register}
                        />
                        {errors?.password && <p className='text-red-500'>Please Provide Password</p>}
                    </div>

                    <input className='btn btn-accent my-2' type="submit" value='Login' />
                </form>
                <p>Not Have Any Account? <Link className="link link-neutral" to='/register'>Register Here</Link></p>
            </div>
        </div>
    );
};

export default Login;