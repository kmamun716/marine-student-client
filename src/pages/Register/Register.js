import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../../components/shared/FormInput';


const Register = () => {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
    const navigate = useNavigate();
    const onSubmit = async data => {
        const { email, password, confirmPassword, mobile, gender } = data;
        if (password !== confirmPassword) {
            setError('notMatched', { type: 'custom', message: 'Password Not Matched' });
        } else {
            clearErrors()
            try {
                const student = await axios.post('http://localhost:4000/api/v1/auth/register', { email, password, mobile, gender });
                if (student?.status === 201) {
                    toast.success(student?.data?.message)
                    navigate('/login')
                }
            } catch (err) {
                if (err?.response?.data?.message) {
                    toast.error(err?.response?.data?.message)
                }
            }
        }
    };
    return (
        <div>
            <h2 className='text-xl text-center'>Register Here</h2>
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
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Confirm Password:</span>
                        </label>
                        <FormInput
                            type='password'
                            name='confirmPassword'
                            placeholder='Type Password Again'
                            register={register}
                        />
                        {errors?.confirmPassword && <p className='text-red-500'>Please Provide Confirm Password</p>}
                        {errors?.notMatched && <p className='text-red-500'>{errors?.notMatched?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Mobile No With Country Code:</span>
                        </label>
                        <FormInput
                            type='text'
                            name='mobile'
                            placeholder='Mobile With Country Code'
                            register={register}
                        />
                        {errors?.mobile && <p className='text-red-500'>Please Provide Mobile Number</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Gender:</span>
                        </label>
                        <select {...register("gender")} className="select select-bordered">
                            <option disabled>Select Gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='others'>Others</option>
                        </select>
                    </div>
                    <input className='btn btn-info my-2' type="submit" value='Register' />
                </form>
                <p>Already Have Account? <Link className="link link-neutral" to='/login'>Login Here</Link></p>
            </div>
        </div>
    );
};

export default Register;